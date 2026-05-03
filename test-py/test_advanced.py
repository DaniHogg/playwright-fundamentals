from playwright.sync_api import expect


class TestAdvancedData:
    def test_project_detail_shows_suite_rows_and_history(self, page, to_site_path):
        page.goto(to_site_path("/project.html?project=qa-automation-template"))
        expect(page.locator("#suite-rows tr").first).to_be_visible()
        expect(page.locator("#history-list li").first).to_be_visible()

    def test_coverage_audit_panel_populated(self, page, to_site_path):
        page.goto(to_site_path("/project.html?project=qa-automation-template"))
        expect(page.locator("#coverage-summary .card").first).to_be_visible()
        expect(page.locator("#coverage-link")).to_have_attribute("href", "data/projects/qa-automation-template/coverage-audit.json")
