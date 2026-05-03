import re
from playwright.sync_api import expect


class TestNavigation:
    def test_nav_links_visible_on_primary_pages(self, page, to_site_path):
        for path in ["/", "/about.html", "/portfolio.html", "/dashboard.html"]:
            page.goto(to_site_path(path))
            nav = page.locator("nav.top-nav")
            expect(nav).to_be_visible()
            expect(nav.get_by_role("link", name="About Me")).to_be_visible()
            expect(nav.get_by_role("link", name="Automation Projects")).to_be_visible()
            expect(nav.get_by_role("link", name="Test Results")).to_be_visible()

    def test_dashboard_view_details_navigates(self, page, to_site_path):
        page.goto(to_site_path("/dashboard.html"))
        details = page.get_by_role("link", name="View details").first
        expect(details).to_be_visible()
        details.click()
        expect(page).to_have_url(re.compile(r"project\.html\?project="))
