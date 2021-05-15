const Manager = require("../lib/Manager");

test("Can set office number via constructor argument", () => {
    const testValue = 100;
    const employee = new Manager("Bob", 1, "test@test.com", testValue);
    expect(employee.officeNumber).toBe(testValue);
});

test("getRole() should return \"Manager\"", () => {
    const testValue = "Manager";
    const employee = new Manager("Bob", 1, "test@test.com", 100);
    expect(employee.getRole()).toBe(testValue);
});

test("Can get office number via getOffice()", () => {
    const testValue = 100;
    const employee = new Manager("Bob", 1, "test@test.com", testValue);
    expect(employee.getOfficeNumber()).toBe(testValue);
});