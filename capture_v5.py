from playwright.sync_api import sync_playwright
import os

target_file = r"file:///c:/Users/user/ergopack-india/src/newsletters/footers/footer_v5_exact/footer_v5.html"
output_dir = r"src/newsletters/footers/footer_v5_exact"

selectors = {
    "footer_v5_1200x400.png": ".size-1200-400"
}

def capture_screenshots():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.set_viewport_size({"width": 1500, "height": 600}) 
        page.goto(target_file)
        
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)

        for filename, selector in selectors.items():
            element = page.query_selector(selector)
            if element:
                save_path = os.path.join(output_dir, filename)
                element.screenshot(path=save_path)
                print(f"Captured: {save_path}")
            else:
                print(f"Element not found: {selector}")
        
        browser.close()

if __name__ == "__main__":
    capture_screenshots()
