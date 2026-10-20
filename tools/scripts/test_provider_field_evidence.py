import unittest

from provider_field_evidence import inspect_html


class FieldEvidenceTests(unittest.TestCase):
    def test_scanned_dns_records_are_not_the_assigned_nameservers(self):
        doc = """<!-- Page saved with SingleFile
 url: https://dash.cloudflare.com/zone.example/confirm-scanned-records -->
        <html><body><h1>Confirm scanned records</h1>
        <table><tr><td>A</td><td>192.0.2.15</td></tr>
        <tr><td>CNAME</td><td>parkingpage.example.test</td></tr></table></body></html>"""
        x = inspect_html(doc)
        self.assertEqual(x['status'], 'DNS_SCAN_NOT_NAMESERVER_ASSIGNMENT')
        self.assertEqual(x['cloudflare_nameservers'], [])
        self.assertTrue(x['dns_record_ips_present'])

    def test_scan_with_ns_records_still_not_assignment(self):
        doc = """<!-- Page saved with SingleFile
        url: https://dash.cloudflare.com/a/b/confirm-scanned-records -->
        <h1>Confirm scanned records</h1>
        <p>Your Cloudflare nameservers</p><table>
        <tr><td>NS record</td><td>luna.ns.cloudflare.com</td></tr>
        <tr><td>NS record</td><td>toro.ns.cloudflare.com</td></tr></table>"""
        self.assertEqual(inspect_html(doc)['cloudflare_nameservers'], [])

    def test_two_labeled_nameservers_from_activation_page(self):
        doc = """<!-- Page saved with SingleFile
        url: https://dash.cloudflare.com/a/domain/overview -->
        <main><h2>Your Cloudflare nameservers</h2><div><b>luna.ns.cloudflare.com</b>
        <b>toro.ns.cloudflare.com</b></div></main>"""
        x = inspect_html(doc)
        self.assertEqual(x['status'], 'TWO_LABELED_NAMESERVERS_FOUND_VERIFY_WITH_CURRENT_SCREEN')
        self.assertEqual(x['cloudflare_nameservers'], ['luna.ns.cloudflare.com', 'toro.ns.cloudflare.com'])

    def test_nameserver_without_assignment_label_remains_unverified(self):
        doc = "<body><p>luna.ns.cloudflare.com and toro.ns.cloudflare.com</p></body>"
        self.assertEqual(inspect_html(doc)['status'], 'CANDIDATES_UNVERIFIED_DO_NOT_PASTE')

    def test_one_name_is_not_complete_pair(self):
        doc = "<h2>Your Cloudflare nameservers</h2><span>luna.ns.cloudflare.com</span>"
        self.assertEqual(inspect_html(doc)['cloudflare_nameservers'], [])

    def test_script_strings_do_not_get_trusted(self):
        doc = "<script>const samples=['luna.ns.cloudflare.com','toro.ns.cloudflare.com'];</script>"
        self.assertEqual(inspect_html(doc)['status'], 'ASSIGNED_NAMESERVERS_ABSENT')

    def test_examples_in_unlabeled_ui_do_not_get_copied(self):
        doc = "<p>Examples luna.ns.cloudflare.com, toro.ns.cloudflare.com</p>"
        self.assertEqual(inspect_html(doc)['cloudflare_nameservers'], [])

    def test_account_id_not_leaked(self):
        doc = "<!-- Page saved with SingleFile url: https://dash.cloudflare.com/PRIVATEIDENTIFIER/xyz/confirm-scanned-records --><p>192.0.2.15</p>"
        self.assertNotIn('PRIVATEIDENTIFIER', str(inspect_html(doc)))

    def test_normalizes_case_and_trailing_period(self):
        doc = '<h2>Your Cloudflare nameservers</h2><div>LuNa.ns.cloudflare.com.</div><div>TORO.ns.cloudflare.com</div>'
        self.assertEqual(inspect_html(doc)['cloudflare_nameservers'], ['luna.ns.cloudflare.com', 'toro.ns.cloudflare.com'])


if __name__ == '__main__':
    unittest.main()
