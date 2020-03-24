import sqlite3
from sqlite3 import Error
import json
import random
class Meter:
    """
    id = Database ID of the meter
    ip = IP Address assigned to the meter
    active = (running, stopped) Current State of the meter
    meterType = (low, medium, high) Adjustment to the range of values the meter will produce
    """

    def __init__(self, id, ip, active = "running", meterType = "medium"):
        self.id = id
        self.ip = ip
        self.active = active
        self.meterType = meterType 

        #Setup the database for this meter
        self.dbString = "meter" + str(id) + "_db"
        self.conn = self.openDatabase()
        if(self.conn is not None):
            self.createTable()

    def __str__(self):
        return "Meter " + str(self.id) + ": <" + self.ip + ", " + self.active + ">" 

    def openDatabase(self):
        try:
            conn = sqlite3.connect(self.dbString, isolation_level=None)
        except Error as e:
            print(e)
        finally:
            return conn
    def createTable(self):
        sql_string = "CREATE TABLE IF NOT EXISTS data(timestamp, realPowerMin NOT NULL, realPowerMax NOT NULL, realPowerAvg NOT NULL, reactivePowerMin NOT NULL, reactivePowerMax NOT NULL, reactivePowerAvg NOT NULL, voltageMin NOT NULL, voltageMax NOT NULL, voltageAvg NOT NULL, currentMin NOT NULL, currentMax NOT NULL, currentAvg NOT NULL, energy NOT NULL);" 
        c = self.conn.cursor()
        c.execute(sql_string)
    
    def insertData(self, timeStamp, realPowerMin, realPowerMax, realPowerAvg, reactivePowerMin, reactivePowerMax,reactivePowerAvg, voltageMin, voltageMax, voltageAvg, currentMin, currentMax, currentAvg, energy):
        sql_string = "INSERT INTO data(timestamp, realPowerMin, realPowerMax, realPowerAvg, reactivePowerMin, reactivePowerMax, reactivePowerAvg, voltageMin, voltageMax, voltageAvg, currentMin, currentMax, currentAvg, energy) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
        self.conn.cursor().execute(sql_string, (timeStamp, realPowerMin, realPowerMax, realPowerAvg, reactivePowerMin, reactivePowerMax,reactivePowerAvg, voltageMin, voltageMax, voltageAvg, currentMin, currentMax, currentAvg, energy))
    def getData(self, timeStamp):
        sql_string = "SELECT * FROM data"
        self.conn.row_factory = sqlite3.Row
        rows = self.conn.cursor().execute(sql_string).fetchall()
        return json.dumps([dict(ix) for ix in rows])
    def deleteAllData(self):
        sql_string = "DELETE FROM data"
        self.conn.cursor().execute(sql_string)

    def generateData(self, timeStamp):
        #Average Monthly Household Energy = 1,000,000 Wh = 3600000000 Joules
        #Average Household Power = 1370W
        #Average Energy Per Five Minutes= 411000 Joules = 114 Wh 
        if(self.active):
            time = timeStamp
            energy = 114 + random.randrange(-20,20)
            realPower = 1370 + random.randrange(-200, 200)
            realPowerMin = realPower - random.randrange(0,200)
            realPowerMax = realPower + random.randrange(0,200)
            reactivePower = 800 + random.randrange(-200, 200)
            reactivePowerMin = reactivePower - random.randrange(0,200)
            reactivePowerMax = reactivePower + random.randrange(0,200)
            voltage = 120 + random.randrange(-5, 5)
            voltageMin = voltage - random.randrange(0, 5)
            voltageMax = voltage + random.randrange(0, 5)
            current = float(realPower) / float(voltage)
            currentMin = float(realPowerMin) / float(voltageMin)
            currentMax = float(realPowerMax) / float(voltageMax)
            self.insertData(time, realPowerMin, realPowerMax, realPower, reactivePowerMin, reactivePowerMax, reactivePower, voltageMin, voltageMax, voltage, currentMin, currentMax, current, energy)
        else:
            time = timeStamp
            energy = 0
            realPower = 0
            realPowerMin = 0
            realPowerMax = 0
            reactivePower = 0
            reactivePowerMin = 0
            reactivePowerMax = 0
            voltage = 0
            voltageMin = 0
            voltageMax = 0
            current = 0
            currentMin = 0
            currentMax = 0
            self.insertData(time, realPowerMin, realPowerMax, realPower, reactivePowerMin, reactivePowerMax, reactivePower, voltageMin, voltageMax, voltage, currentMin, currentMax, current, energy)



        

