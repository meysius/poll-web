# -*- coding: utf-8 -*-
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
import unittest, time, re

class CreatePollTest(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.implicitly_wait(30)
        self.base_url = "http://localhost:5000/"
        self.verificationErrors = []
        self.accept_next_alert = True
    
    def test_create_poll(self):
        driver = self.driver
        driver.get(self.base_url + "/polls")
        driver.find_element_by_link_text("Login").click()
        driver.find_element_by_xpath("//input[@type='email']").clear()
        driver.find_element_by_xpath("//input[@type='email']").send_keys("feghhi@ualberta.ca")
        driver.find_element_by_xpath("//input[@type='password']").clear()
        driver.find_element_by_xpath("//input[@type='password']").send_keys("secret")
        driver.find_element_by_xpath("//button[@type='submit']").click()
        driver.find_element_by_id("create-poll-btn").click()
        driver.find_element_by_id("question").clear()
        driver.find_element_by_id("question").send_keys("question test")
        driver.find_element_by_id("option1").clear()
        driver.find_element_by_id("option1").send_keys("option test 1")
        driver.find_element_by_id("option2").clear()
        driver.find_element_by_id("option2").send_keys("option test 2")
        driver.find_element_by_id("submit-create-poll").click()
        self.assertRegexpMatches(driver.find_element_by_id("created-polls-panel").text, r".*question\stest.*")
        driver.find_element_by_link_text("Log out").click()
    
    def is_element_present(self, how, what):
        try: self.driver.find_element(by=how, value=what)
        except NoSuchElementException as e: return False
        return True
    
    def is_alert_present(self):
        try: self.driver.switch_to_alert()
        except NoAlertPresentException as e: return False
        return True
    
    def close_alert_and_get_its_text(self):
        try:
            alert = self.driver.switch_to_alert()
            alert_text = alert.text
            if self.accept_next_alert:
                alert.accept()
            else:
                alert.dismiss()
            return alert_text
        finally: self.accept_next_alert = True
    
    def tearDown(self):
        self.driver.quit()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()
