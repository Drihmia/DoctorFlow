const filtredSessions = async (th, patient, sessions) => {
  // Session's fields that can be shared with the patient
  const authFieldsToShare = [
    '_id', 'doctor', 'patient', 'date', 'time', 'type', 'createdAt',
    'updatedAt', 'notes', 'nextAppointment', 'prescription', 'diagnosis',
    'labTests', 'radOrders',
  ];

  // Function to process each session
  const processSession = async (session) => {
    const sharedSession = {};
    for (const key of authFieldsToShare) {
      if (session[key]) {
        sharedSession[key] = session[key];
      }
    }

    sharedSession.doctor = await th.getPatientDoctor(patient);
    sharedSession.patient = undefined;

    return sharedSession;
  };

  // Process all sessions concurrently
  const sharedSessions = await Promise.all(sessions.map(processSession));

  return sharedSessions;
};

const empty = () => {};

export { filtredSessions, empty };
