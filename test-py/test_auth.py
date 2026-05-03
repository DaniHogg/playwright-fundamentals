import re
from playwright.sync_api import expect


class TestPublicAccess:
    def test_main_pages_open_without_auth_redirect(self, page, to_site_path):
        for path in ["/", "/about.html", "/portfolio.html", "/dashboard.html"]:
            response = page.goto(to_site_path(path))
            assert response and response.ok
            expect(page).not_to_have_url(re.compile(r"login|signin|auth", re.I))

    def test_portfolio_external_links_open_in_new_tab(self, page, to_site_path):
        page.goto(to_site_path("/portfolio.html"))
        links = page.locator('#portfolio-cards a[target="_blank"][rel*="noreferrer"]')
        expect(links.first).to_be_visible()
        assert links.count() > 0