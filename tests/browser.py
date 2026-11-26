"""Run the production build in Chromium across all routes and key interactions."""
import os
from pathlib import Path
from subprocess import Popen
from time import monotonic, sleep
from urllib.error import URLError
from urllib.parse import urlsplit
from urllib.request import urlopen

from playwright.sync_api import sync_playwright


base = os.getenv("BASE_URL", "http://127.0.0.1:4173").rstrip("/")
external = bool(os.getenv("BASE_URL"))
server = None if external else Popen(
    ["python3", "-m", "http.server", "4173", "--bind", "127.0.0.1", "--directory", "dist"],
    cwd=Path(__file__).resolve().parents[1],
)
routes = ["/", "/work/", "/work/cognisight/", "/work/research-hub/", "/work/mathverse/", "/lab/", "/about/",
          "/recruiters/", "/notes/", "/notes/reading-probabilities/", "/notes/paper-discovery/",
          "/assistant/", "/404.html"]

try:
    deadline = monotonic() + 12
    while True:
        try:
            with urlopen(base + "/", timeout=2) as response:
                assert response.status == 200
            break
        except OSError:
            if monotonic() >= deadline:
                raise
            sleep(.2)
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(executable_path=os.getenv("CHROMIUM_PATH") or None, args=["--no-sandbox"])
        errors = []
        broken = []
        for width in (1440, 390, 320):
            page = browser.new_page(viewport={"width": width, "height": 900}, reduced_motion="reduce", color_scheme="dark")
            page.on("pageerror", lambda error: errors.append(str(error)))
            page.on("response", lambda response: broken.append(response.url) if response.status >= 400 else None)
            for route in routes:
                assert page.goto(base + route).status == 200, route
                assert page.locator("main h1").count() == 1, route
                assert page.locator('html').get_attribute("lang") == "en"
                assert page.evaluate("document.documentElement.scrollWidth <= innerWidth"), (width, route)
                for href in page.locator('a[href^="/"], a[href^="#"]').evaluate_all("(links) => links.map(a => a.getAttribute('href'))"):
                    path = urlsplit(href).path
                    if path:
                        assert page.request.get(base + path).ok, (route, href)
                    if href.startswith("#"):
                        assert page.locator(href).count() == 1, (route, href)
            page.goto(base)
            assert page.get_by_role("button", name="Play motion").get_attribute("aria-pressed") == "true"
            page.get_by_role("button", name="Play motion").click()
            assert page.get_by_role("button", name="Pause motion").get_attribute("aria-pressed") == "false"
            page.get_by_role("button", name="Switch to light theme").click()
            page.reload()
            assert page.locator("html").get_attribute("data-theme") == "light"
            page.keyboard.press("Control+k")
            page.get_by_label("Projects, pages, and topics").fill("OpenAlex")
            assert page.get_by_role("dialog").get_by_role("link", name="AI Research Paper Hub").count() == 1
            page.keyboard.press("Escape")
            assert not page.get_by_role("dialog").is_visible()
            page.goto(base + "/assistant/")
            page.get_by_role("button", name="Experience").click()
            assert "June to September 2026" in page.locator("#answer").inner_text()
            page.get_by_label("Your question").fill("xylophone rental prices")
            page.get_by_role("button", name="Ask", exact=True).click()
            assert "couldn’t find" in page.locator("#answer").inner_text()
            page.goto(base + "/lab/")
            page.locator("#threshold-value").press("End")
            assert "Undefined" in page.locator("#threshold-results").inner_text()
            initial = page.locator("#network-results").inner_text()
            page.locator("#node-a").press("Home")
            assert page.locator("#network-results").inner_text() != initial
            page.get_by_role("button", name="Run workflow").click()
            assert "CogniSight" in page.locator("#agent-results").inner_text()
            page.get_by_label("Research task").select_option("qzxv")
            page.get_by_role("button", name="Run workflow").click()
            assert "stopped" in page.locator("#agent-results").inner_text()
            page.get_by_label("Sales segment").select_option("Partner")
            assert "$30,900" in page.locator("#bi-results").inner_text()
            page.goto(base + "/recruiters/")
            with page.expect_download() as download:
                page.get_by_role("link", name="Download selected work PDF").click()
            assert download.value.suggested_filename == "selected-work.pdf"
            page.close()
        assert not errors, errors
        assert not broken, broken
    print(f"Verified {len(routes)} routes at 1440, 390, and 320 px, local links, PDF, and browser interactions.")
finally:
    if server:
        server.terminate()
        server.wait(timeout=5)
