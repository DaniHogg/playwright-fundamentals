import re
from playwright.sync_api import expect


class TestSiteSmoke:
    def test_loads_home(self, page, to_site_path):
        response = page.goto(to_site_path("/"))
        assert response and response.ok
        expect(page).to_have_title(re.compile(r"Daniel Hogg|QA Automation", re.I))

    def test_loads_about(self, page, to_site_path):
        response = page.goto(to_site_path("/about.html"))
        assert response and response.ok
        expect(page).to_have_title(re.compile(r"About", re.I))

    def test_loads_portfolio(self, page, to_site_path):
        response = page.goto(to_site_path("/portfolio.html"))
        assert response and response.ok
        expect(page).to_have_title(re.compile(r"Automation Projects", re.I))

    def test_loads_dashboard(self, page, to_site_path):
        response = page.goto(to_site_path("/dashboard.html"))
        assert response and response.ok
        expect(page).to_have_title(re.compile(r"Test Results|Evidence", re.I))
