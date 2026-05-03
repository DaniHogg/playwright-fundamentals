from playwright.sync_api import expect


class TestProjectLookup:
    def test_playwright_project_detail_route_loads(self, page, to_site_path):
        page.goto(to_site_path("/project.html?project=playwright"))
        expect(page.locator("#project-title")).to_contain_text("Playwright Automation")
        expect(page.locator("#project-summary")).to_contain_text("Completed")

    def test_project_context_panel_appears(self, page, to_site_path):
        page.goto(to_site_path("/project.html?project=playwright"))
        context = page.locator("#project-context")
        expect(context).to_be_visible()
        expect(context).to_contain_text("What was tested")
