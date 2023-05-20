const express = require("express");

const rootdb = require("../db");

const db = require("../db");
const router = express.Router();

router.post("/login", async function (req, res) {
  try {
    let { username, password } = req.body;
    let result = await db.login(username, password);
    res.json(result);
  } catch (error) {
    res.send({ status: 0, error: error });
  }
});

router.post("/register", async (req, res) => {
  try {
    console.log(req);
    let result = await db.register(req.body);
    res.json(result);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/patientsdetail", async (req, res) => {
  try {
    let result = await db.PatientsDetail();
    console.log(result);
    res.json(result);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get("/patientsdetailbyid", async (req, res) => {
  try {
    let result = await db.PatientsDetailbyID();
    console.log(result);
    res.json(result);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get("/doctorsdetail", async (req, res) => {
  try {
    let result = await db.DoctorsDetail();
    console.log(result);
    res.json(result);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get("/doctorsdetailbyid", async (req, res) => {
  try {
    let result = await db.DoctorsDetailbyID();
    console.log(result);
    res.json(result);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get("/doctorsdetailofappointment", async (req, res) => {
  try {
    let result = await db.DoctorsDetailofAppointment();
    console.log(result);
    res.json(result);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get("/appointmentsdetail", async (req, res) => {
  try {
    let result = await db.AppointmentssDetail();
    console.log(result);
    res.json(result);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.post("/addpatient", async (req, res) => {
  try {
    let result = await db.AddPatient(req.body);
    res.json(result);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.get("/patient/:id", async (req, res) => {
  try {
    let result = await db.Patientgetid(req.params.id);
    res.json(result);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.get("/doctor/:id", async (req, res) => {
  try {
    let result = await db.Doctorgetid(req.params.id);
    res.json(result);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.put("/doctordelete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let result = await db.DoctorDelete(id);
    res.json(result);
  } catch (err) {
    console.log(err);

    res.sendStatus(500);
  }
});

router.delete("/patientdelete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let result = await db.PatientDelete(id);
    res.json(result);
  } catch (err) {
    console.log(err);

    res.sendStatus(500);
  }
});

router.delete("/appointmentdelete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let result = await db.AppointmentDelete(id);
    res.json(result);
  } catch (err) {
    console.log(err);

    res.sendStatus(500);
  }
});

router.put("/PatientUpdate", async (req, res) => {
  try {
    let result = await db.UpdatePatient(req.body);
    res.json(result);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.put("/DoctorUpdate", async (req, res) => {
  try {
    let result = await db.UpdateDoctor(req.body);
    res.json(result);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
