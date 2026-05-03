import re
from playwright.sync_api import expect


class TestErrorHandling:
    def test_invalid_project_id_surfaces_error(self, page, to_site_path):
        page.goto(to_site_path("/project.html?project=does-not-exist"))
        expect(page.locator("#project-title")).to_contain_text("Failed to fetch")

    def test_dashboard_still_renders_with_stale_data(self, page, to_site_path):
        page.goto(to_site_path("/dashboard.html"))
        first_card = page.locator("#project-cards .card").first
        expect(first_card).to_be_visible()
        expect(page.locator("#project-cards")).to_contain_text(re.compile(r"Fresh|Stale"))
