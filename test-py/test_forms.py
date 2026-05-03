from playwright.sync_api import expect


class TestProjectRouteInputs:
    def test_project_query_renders_details(self, page, to_site_path):
        page.goto(to_site_path("/project.html?project=qa-automation-template"))
        expect(page.locator("#project-title")).to_contain_text("QA Automation Template")
        expect(page.locator("#latest-meta .card")).to_have_count(6)

    def test_missing_project_query_shows_empty_state(self, page, to_site_path):
        page.goto(to_site_path("/project.html"))
        expect(page.locator("#project-title")).to_contain_text("Missing project id")
