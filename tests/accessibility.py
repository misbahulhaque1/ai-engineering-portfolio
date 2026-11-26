"""Optional axe check. Pass the local axe.min.js path via AXE_JS."""
import json
import os
from pathlib import Path
from subprocess import Popen
from time import sleep

from playwright.sync_api import sync_playwright

base = "http://127.0.0.1:4174"
routes = ["/", "/work/", "/work/cognisight/", "/work/research-hub/", "/work/mathverse/", "/lab/", "/about/",
          "/recruiters/", "/notes/", "/notes/reading-probabilities/", "/notes/paper-discovery/",
          "/assistant/", "/404.html"]
server = Popen(
    ["python3", "-m", "http.server", "4174", "--bind", "127.0.0.1", "--directory", "dist"],
    cwd=Path(__file__).resolve().parents[1],
)
try:
    sleep(.3)
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(executable_path=os.getenv("CHROMIUM_PATH"), args=["--no-sandbox"])
        issues = []
        for scheme in ("dark","light"):
            page = browser.new_page(viewport={"width":1440,"height":900}, color_scheme=scheme, reduced_motion="reduce")
            for route in routes:
                page.goto(base+route)
                page.add_script_tag(path=os.environ["AXE_JS"])
                result = page.evaluate("async () => await axe.run({runOnly:['wcag2a','wcag2aa','wcag21a','wcag21aa']})")
                for violation in result["violations"]:
                    issues.append([scheme,route,violation["id"],[node["target"] for node in violation["nodes"]]])
            page.close()
        assert not issues, json.dumps(issues)
        print(f"No automated WCAG 2.1 A/AA violations on {len(routes)} routes in both themes.")
finally:
    server.terminate()
    server.wait(timeout=5)
