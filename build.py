#!/usr/bin/env python3
"""Static site builder: wraps page bodies in the shared shell.

Usage: python3 build.py
Reads src/shell.html + src/pages/*.html -> writes <name>.html at project root.
No dependencies. Re-run after editing anything in src/.
"""
from pathlib import Path

ROOT = Path(__file__).parent
SRC = ROOT / "src"

META = {
    "index": ("Skyway Forwarders — Air, sea & road freight into Kenya",
              "Freight forwarding and customs clearing from China, the U.K., Dubai, Turkey and the U.S.A. into Kenya. Consolidated, cleared, delivered."),
    "services": ("Services — Air, sea, clearing, trucking & warehousing | Skyway",
                 "Air freight, sea cargo, customs clearing, trucking and warehousing, plus consolidation and door-to-door delivery across Kenya."),
    "lanes": ("Trade lanes — China, U.K., Dubai, Turkey, U.S.A. to Kenya | Skyway",
              "Transit times, arrival ports and local offices for every Skyway trade lane into Kenya."),
    "calculators": ("Cost calculators — Air, sea, trucking, door to door | Skyway",
                    "Estimate air cargo, sea freight, trucking and door-to-door costs in Kenyan shillings before you ship."),
    "tracking": ("Track your shipment | Skyway Forwarders",
                 "Follow your consignment from booking through customs clearance to final delivery."),
    "network": ("Our network — offices & warehouses in China, Dubai, Kenya | Skyway",
                "Skyway offices and warehouses in Guangzhou, Foshan, Dubai, Nairobi and Mombasa, with direct contacts."),
    "about": ("About Skyway Forwarders — clearing & forwarding since day one",
              "Who we are, how we work, and what the press says about Skyway Cargo's buy-now-pay-later shipping model."),
    "contact": ("Contact Skyway Forwarders — Nairobi, Mombasa & WhatsApp",
                "Talk to a freight specialist. Head office on General Waruingi Street, Nairobi, plus phone, WhatsApp and email."),
}


def build():
    shell = (SRC / "shell.html").read_text(encoding="utf-8")
    pages = sorted((SRC / "pages").glob("*.html"))
    for page in pages:
        name = page.stem
        title, desc = META.get(name, ("Skyway Forwarders", "Freight forwarding into Kenya."))
        html = (shell
                .replace("{{TITLE}}", title)
                .replace("{{DESC}}", desc)
                .replace("{{PAGE}}", name)
                .replace("{{BODY}}", page.read_text(encoding="utf-8")))
        (ROOT / f"{name}.html").write_text(html, encoding="utf-8")
        print(f"  built {name}.html")
    print(f"{len(pages)} pages built")


if __name__ == "__main__":
    build()
