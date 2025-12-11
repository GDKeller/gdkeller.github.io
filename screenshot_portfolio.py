"""
Screenshot capture script for portfolio evaluation
Captures the full page at different scroll positions

Usage:
    python screenshot_portfolio.py [--port PORT]

Examples:
    python screenshot_portfolio.py              # Uses default port 3111
    python screenshot_portfolio.py --port 3000  # Uses port 3000
"""
import argparse
import os
import time
from playwright.sync_api import sync_playwright

SCREENSHOTS_DIR = os.path.join(os.path.dirname(__file__), 'screenshots')


def capture_portfolio_screenshots(port: int = 3111):
    os.makedirs(SCREENSHOTS_DIR, exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={'width': 1920, 'height': 1080},
            device_scale_factor=1
        )
        page = context.new_page()

        print(f"Loading portfolio from http://localhost:{port}/...")
        page.goto(f'http://localhost:{port}/')

        page.wait_for_load_state('networkidle')
        time.sleep(2)  # Additional wait for animations

        total_height = page.evaluate('document.documentElement.scrollHeight')
        viewport_height = 1080

        print(f"Total page height: {total_height}px")

        screenshots = []
        scroll_position = 0
        screenshot_num = 1

        print(f"Capturing screenshot {screenshot_num} - Top of page (Hero)")
        path = os.path.join(SCREENSHOTS_DIR, f'screenshot_{screenshot_num}_hero.png')
        page.screenshot(path=path)
        screenshots.append(f'screenshot_{screenshot_num}_hero.png')
        screenshot_num += 1

        scroll_increment = 800

        while scroll_position < total_height - viewport_height:
            scroll_position += scroll_increment
            page.evaluate(f'window.scrollTo(0, {scroll_position})')
            time.sleep(0.5)

            if scroll_position < 1000:
                section_name = "header"
            elif scroll_position < 2000:
                section_name = "nypost"
            elif scroll_position < 3500:
                section_name = "anglerfish"
            elif scroll_position < 4500:
                section_name = "skills"
            elif scroll_position < 6000:
                section_name = "jobs"
            elif scroll_position < 8000:
                section_name = "projects"
            else:
                section_name = "footer"

            print(f"Capturing screenshot {screenshot_num} - Scroll position {scroll_position}px ({section_name})")
            path = os.path.join(SCREENSHOTS_DIR, f'screenshot_{screenshot_num}_{section_name}.png')
            page.screenshot(path=path)
            screenshots.append(f'screenshot_{screenshot_num}_{section_name}.png')
            screenshot_num += 1

        page.evaluate(f'window.scrollTo(0, {total_height})')
        time.sleep(0.5)
        print(f"Capturing screenshot {screenshot_num} - Bottom of page")
        path = os.path.join(SCREENSHOTS_DIR, f'screenshot_{screenshot_num}_bottom.png')
        page.screenshot(path=path)
        screenshots.append(f'screenshot_{screenshot_num}_bottom.png')

        print("Capturing full page screenshot...")
        page.screenshot(path=os.path.join(SCREENSHOTS_DIR, 'screenshot_fullpage.png'), full_page=True)

        browser.close()

        print(f"\nCaptured {len(screenshots)} screenshots successfully!")
        print(f"Screenshots saved to {SCREENSHOTS_DIR}:")
        for ss in screenshots:
            print(f"  - {ss}")
        print("  - screenshot_fullpage.png")


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Capture portfolio screenshots')
    parser.add_argument('--port', type=int, default=3111, help='Port number (default: 3111)')
    args = parser.parse_args()

    capture_portfolio_screenshots(port=args.port)
