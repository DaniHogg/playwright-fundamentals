import time
from playwright.sync_api import expect


class TestPerformanceBaseline:
    def test_homepage_domcontentloaded_under_8s(self, page, to_site_path):
        start = time.time()
        page.goto(to_site_path("/"), wait_until="domcontentloaded")
        elapsed = time.time() - start
        assert elapsed < 8
        expect(page.locator("h1")).to_be_visible()

    def test_dashboard_cards_render_under_10s(self, page, to_site_path):
        start = time.time()
        page.goto(to_site_path("/dashboard.html"))
        expect(page.locator("#project-cards .card").first).to_be_visible()
        elapsed = time.time() - start
        assert elapsed < 10
