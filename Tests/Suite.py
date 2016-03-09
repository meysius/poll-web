import sys
import unittest
import LogInAndOutTest
import CreatePollTest
import VoteTest
 
 
class Test_Suite(unittest.TestCase):
   
    def test_main(self):
        self.suite = unittest.TestSuite()
        self.suite.addTests([            
            unittest.defaultTestLoader.loadTestsFromTestCase(LogInAndOutTest.LogInAndOutTest),         
            unittest.defaultTestLoader.loadTestsFromTestCase(CreatePollTest.CreatePollTest),
            unittest.defaultTestLoader.loadTestsFromTestCase(VoteTest.VoteTest),
            ])
        runner = unittest.TextTestRunner()
        runner.run (self.suite)
 
import unittest
if __name__ == "__main__":
    unittest.main()