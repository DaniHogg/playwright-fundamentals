from playwright.sync_api import expect


class TestAccessibility:
    def test_document_landmarks_present(self, page, to_site_path):
        page.goto(to_site_path("/"))
        expect(page.locator("html")).to_have_attribute("lang", "en")
        expect(page.locator("main.shell")).to_be_visible()
        expect(page.locator('nav[aria-label="Primary"]')).to_be_visible()

    def test_primary_ctas_have_accessible_names(self, page, to_site_path):
        page.goto(to_site_path("/"))
        expect(page.get_by_role("link", name="View Automation Projects").first).to_be_visible()
        expect(page.get_by_role("link", name="Open Test Results").first).to_be_visible()
