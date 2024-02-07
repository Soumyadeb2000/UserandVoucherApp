const request = require("supertest");

const app = require('../app');

describe("POST /users", () => {
    it("should create a user", async () => {
        const res = await request(app).post("/users").send({
            "newUser": {
                "name": "testUser",
                "email": "test@user",
                "phone": 12345
            }
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.user.name).toBe("testUser");
        expect(res.body.user.email).toBe("test@user");
        expect(res.body.user.phone).toBe(12345);
    });
});

describe("GET /users/:id", () => {
    it("should return a user", async () => {
        const res = await request(app).get(
            "/users/1"
        );
        expect(res.statusCode).toBe(200);
        expect(res.body.user.name).toBe("testUser");
        expect(res.body.user.email).toBe("test@user");
        expect(res.body.user.phone).toBe(12345);
    });
});

describe("PUT /users/:id", () => {
    it("should update a user", async () => {
        const res = await request(app)
            .put("/users/1")
            .send({
                "updateData": {
                    "name": "newUser",
                    "email": "new@user",
                    "phone": 11111
                }
            });
        expect(res.statusCode).toBe(200);
        expect(res.body.updatedUser.name).toBe("newUser");
        expect(res.body.updatedUser.email).toBe("new@user");
        expect(res.body.updatedUser.phone).toBe(11111);
    });
});

describe("DELETE /users/:id", () => {
    it("should delete a user", async () => {
        const res = await request(app).delete(
            "/users/1"
        );
        expect(res.statusCode).toBe(200);
    });
});

describe("POST /vouchers", () => {
    it("should create a voucher", async () => {
      const res = await request(app).post("/vouchers").send({
        "newVoucher": {
          "title": "test",
          "description": "testOffer",
          "offerPrice": 500,
          "retailPrice": 800,
          "code": "test123"
        }
      });
      expect(res.statusCode).toBe(201);
    });
  });
  
  describe("GET /vouchers/:id", () => {
    it("should return a voucher", async () => {
      const res = await request(app).get(
        "/vouchers/1"
      );
      expect(res.statusCode).toBe(200);
      expect(res.body.voucher.title).toBe("test");
      expect(res.body.voucher.description).toBe("testOffer");
      expect(res.body.voucher.offerPrice).toBe(500);
      expect(res.body.voucher.retailPrice).toBe(800);
      expect(res.body.voucher.code).toBe("test123");
    });
  });
  
  describe("PUT /vouchers/:id", () => {
    it("should update a voucher", async () => {
      const res = await request(app)
        .put("/vouchers/1")
        .send({
          "updateData": {
            "title": "Netflix",
            "description": "newOffer",
          }
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.updatedVoucher.title).toBe("Netflix");
      expect(res.body.updatedVoucher.description).toBe("newOffer");
    });
  });
  
  describe("DELETE /vouchers/:id", () => {
    it("should delete a voucher", async () => {
      const res = await request(app).delete(
        "/vouchers/1"
      );
      expect(res.statusCode).toBe(200);
    });
  });