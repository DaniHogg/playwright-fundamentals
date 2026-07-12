from playwright.sync_api import expect


class TestDashboardEvidenceFeatures:
    def test_dashboard_cards_show_repository_and_workflow_links(self, page, to_site_path):
        page.goto(to_site_path("/dashboard.html"))
        card = page.locator("#project-cards .card").first
        expect(card).to_be_visible()
        expect(card.get_by_role("link", name="Repository")).to_be_visible()
        expect(card.get_by_role("link", name="Workflow run")).to_be_visible()

    def test_proof_strip_has_tool_chips(self, page, to_site_path):
        import re
        page.goto(to_site_path("/"))
        tools = page.locator("#proof-strip .tool-chip")
        expect(tools.first).to_be_visible()
        strip = page.locator("#proof-strip")
        for tool in ("Playwright", "Selenium", "Pytest", "k6"):
            expect(strip).to_contain_text(re.compile(tool, re.IGNORECASE))
