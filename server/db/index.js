const mysql = require("mysql");
const jwt = require("jsonwebtoken");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "mysql@123",
  database: "HospitalManagementSystem",
  connectionLimit: 10,
});
let rootdb = {};

rootdb.login = (username, password) => {
  return new Promise((resolve, reject) => {
    console.log(username, password);
    pool.query(
      `select * from user where username=? and password=?`,
      [username, password],
      (err, result) => {
        if (err) {
          return reject(err);
          console.log(err);
        } else if (!result.length) {
          // console.log("your data does not match",result);
          pool.query(
            `select * from user where username=? `,
            [username],
            (err, result) => {
              if (err) {
                return reject({ status: 0, data: [""] });
              }
              console.log("password does not match");
              return resolve({ status: 0, data: "Incorrect_password" });
            }
          );
          return resolve({ status: 0, data: "Not_register" });
        } else {
          let token = jwt.sign({ data: result }, "secret");
          return resolve({ status: 1, data: result, token: token });
          console.log("you successfully login", result);
        }
      }
    );
  });
};

rootdb.register = (input) => {
  var sql = `insert into user (username,email,password) values (?,?,?)`;
  console.log(input);
  return new Promise((resolve, reject) => {
    pool.query(
      `select username from user where username=?`,
      [input.username],
      (err, result) => {
        if (err) {
          return reject({ status: 0, data: err });
        } else if (!result.length) {
          console.log("else if", result);
          pool.query(
            sql,
            [input.username, input.email, input.password],
            (err, result) => {
              if (err) {
                return reject({ status: 0, data: err });
              }
              let token = jwt.sign({ data: result }, "secret");
              return resolve({ status: 1, data: result, token: token });
            }
          );
        } else {
          console.log("else if", result);
          return resolve({ status: 0, data: "username already exist" });
        }
      }
    );
  });
};

rootdb.PatientsDetail = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `select * from Patients p inner join Appointments a on p.PatientID=a.PatientID where AppointmentStatus = "Scheduled"`,
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

rootdb.PatientsDetailbyID = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `select PatientName from Patients p inner join Appointments a on p.PatientID=a.PatientID Limit 1 `,
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

rootdb.DoctorsDetail = () => {
  return new Promise((resolve, reject) => {
    pool.query(`select * from Doctors`, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

rootdb.DoctorsDetailbyID = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `select DoctorName from Doctors d inner join Appointments a on a.DOctorID=d.DoctorID Limit 1`,
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

rootdb.DoctorsDetailofAppointment = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `select * from Doctors where JobStatus = "UnFired"`,
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

// end 1
// return new Promise((resolve, reject) => {
//   pool.query(
//     `select * from Appointments where AppointmentStatus = "Scheduled"`,
//     (err, result) => {
//       if (err) {
//         return reject(err);
//       }
//       return resolve(result);
//     }
//   );
// });
// };

rootdb.AppointmentssDetail = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `select * from Appointments where AppointmentStatus = "Scheduled"`,
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

rootdb.AddAppointment = (input) => {
  var sql = `insert into Appointments(PatientID,DoctorID,AppointmentDate,AppointmentTime,AppointmentStatus)
  values(?,?,?,?,?)`;
  return new Promise((resolve, reject) => {
    pool.query(
      sql,
      [
        input.PatientID,
        input.DoctorID,
        input.AppointmentDate,
        input.AppointmentTime,
        input.AppointmentStatus,
      ],
      (err) => {
        if (err) {
          return reject(err);
        }
        return resolve("Successfull Insert");
      }
    );
  });
};

// rootdb.AddPatient = (input) => {
//   var sql1 = `insert into Patients(PatientName,Address,PhoneNumber,Gender,DateOfBirth)
//   values(?,?,?,?,?)`;
//   var sql2 = `insert into Appointments(PatientID,DoctorID,AppointmentDate,AppointmentTime,AppointmentStatus)`;
//   var inputForSql1 = [
//     input.PatientName,
//     input.Address,
//     input.PhoneNumber,
//     input.Gender,
//     input.DateOfBirth,
//   ];
//   // var sqlInsert=
//   return new Promise((resolve, reject) => {
//     pool.query(sql1, inputForSql1, (err, result) => {
//       var PatientID = result.insertId;
//       if (err) {
//         return reject(err);
//       }
//       // console.log(result.insertId);
//       return new Promise((resolve,reject)=>{
//         pool.query(
//           sql2,
//           [
//             input.PatientID,
//             input.DoctorID,
//             input.AppointmentDate,
//             input.AppointmentTime,
//             input.AppointmentStatus,
//           ],
//           (err, result) => {
//             if (err) {
//               return reject(err);
//             }
//             resolve(true);
//           }
//         );
//       })

//       resolve(result);
//     });
//   });
// };

// rootdb.AddPatient=(input)=>{
//   return new Promise((resolve,reject)=>{
//     pool.query
//   })
// }

rootdb.DoctorDelete = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `update Doctors set JobStatus = "fire" where DoctorID=? `,
      [id],
      (err) => {
        if (err) {
          return reject(err);
        }
        return resolve("Successfully Employee Details Delete");
      }
    );
  });
};

rootdb.PatientDelete = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`delete from Patients where PatientID=? `, [id], (err) => {
      if (err) {
        return reject(err);
      }
      return resolve("Successfully Employee Details Delete");
    });
  });
};

rootdb.AppointmentDelete = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `delete from Appointments where AppointmentID=?`,
      [id],
      (err) => {
        if (err) {
          return reject(err);
        }
        return resolve("Successfully Employee Details Delete");
      }
    );
  });
};

rootdb.Patientgetid = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `select * from Patients where PatientID=?`,
      [id],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

rootdb.Doctorgetid = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `select * from Doctors where DoctorID=?`,
      [id],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

rootdb.UpdatePatient = (input) => {
  var sql = `update Patients set PatientName =?, Address=?,PhoneNumber=?,Email=?,Gender=?,DateofBirth=? where PatientID=?`;
  return new Promise((resolve, reject) => {
    pool.query(
      sql,
      [
        input.PatientName,
        input.Address,
        input.PhoneNumber,
        input.Email,
        input.Gender,
        input.DateofBirth,
        input.PatientID,
      ],
      (err) => {
        if (err) {
          return reject(err);
        }
        return resolve("Successfull Update");
      }
    );
  });
};

rootdb.UpdateDoctor = (input) => {
  var sql = `update Doctors set DoctorName =?, Address=?,PhoneNumber=?,Email=?,Gender=?,DateofBirth=?,Specialization=?,Experience=?,JobStatus=? where DoctorID=?`;
  return new Promise((resolve, reject) => {
    pool.query(
      sql,
      [
        input.DoctorName,
        input.Address,
        input.PhoneNumber,
        input.Email,
        input.Gender,
        input.DateofBirth,
        input.Specialization,
        input.Experience,
        input.JobStatus,
        input.DoctorID,
      ],
      (err) => {
        if (err) {
          return reject(err);
        }
        return resolve("Successfull Update");
      }
    );
  });
};
module.exports = rootdb;
