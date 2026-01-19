from playwright.sync_api import sync_playwright
import os

target_file = r"file:///c:/Users/user/ergopack-india/src/newsletters/footers/redesign.html"
output_dir = r"src/newsletters/footers/final_resized"

selectors = {
    "redesign_1200x200.png": ".size-1200-200",
    "redesign_600x150.png": ".size-600-150",
    "redesign_1000x300.png": ".size-1000-300",
    "redesign_1200x400.png": ".size-1200-400"
}

def capture_screenshots():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.set_viewport_size({"width": 1500, "height": 2000}) 
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
