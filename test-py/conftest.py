import os
import pytest


BASE_URL = os.environ.get("BASE_URL", "https://danihogg.github.io").rstrip("/")
BASE_PATH = os.environ.get("SITE_BASE_PATH", "/qa-portfolio-livesite").rstrip("/")


def site_path(path: str = "/") -> str:
    if not path.startswith("/"):
        path = f"/{path}"
    return f"{BASE_URL}{BASE_PATH}{path}"


@pytest.fixture(scope="session")
def browser_context_args(browser_context_args):
    return {
        **browser_context_args,
        "viewport": {"width": 1280, "height": 720},
    }


@pytest.fixture
def to_site_path():
    return site_path
