import re
from playwright.sync_api import expect


class TestBasicHomepage:
    def test_homepage_core_copy_visible(self, page, to_site_path):
        page.goto(to_site_path("/"))
        expect(page.get_by_role("heading", level=1)).to_contain_text(re.compile(r"automation", re.I))
        expect(page.get_by_role("link", name="View Automation Projects").first).to_be_visible()

    def test_proof_strip_renders(self, page, to_site_path):
        page.goto(to_site_path("/"))
        strip = page.locator("#proof-strip")
        expect(strip).to_be_visible()
        expect(strip).to_contain_text("Active projects")
