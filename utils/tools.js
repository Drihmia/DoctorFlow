const filtredSessions = async function (th, patient, sessions) {
  const sharedSessions = [];

  // Session's fields that can be shared with the patient
  const authFieldsToShare = [
    '_id', 'doctor', 'patient', 'date', 'time', 'type', 'createdAt',
    'updatedAt', 'notes', 'nextAppointment', 'prescription', 'diagnosis',
    'labTests', 'radOrders'
  ];

  for (const session of sessions) {
    const sharedSession = {};
    for (const key of authFieldsToShare) {
      if (session[key]) {
        sharedSession[key] = session[key];
      }
    }

    sharedSession.doctor = await th.getPatientDoctor(patient);
    sharedSession.patient = undefined;

    sharedSessions.push(sharedSession);
  }

  return sharedSessions;
};

export { filtredSessions };
