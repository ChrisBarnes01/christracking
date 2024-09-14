export const createDailyRecordQuery = (
  dailyPlan,
  dailyReflection,
  date,
  dietFollowed,
  distractionBlockerOnAndUpdated,
  id,
  meditationToTime,
  noPhone,
  scrollingResisted,
  startDayWithPlan,
  takeDailySupplements
) => {
  return `
      mutation MyMutation {
      createDailyRecord(input: {dailyPlan: "${dailyPlan}", dailyReflection: "${dailyReflection}", date: "${date}", dietFollowed: ${dietFollowed}, distractionBlockerOnAndUpdated: ${distractionBlockerOnAndUpdated}, id: "${id}", meditationToTime: ${meditationToTime}, noPhone: ${noPhone}, scrollingResisted: ${scrollingResisted}, startDayWithPlan: ${startDayWithPlan}, takeDailySupplements: ${takeDailySupplements}}) {
        id
      }
    }
  `;
};

export const getDailyRecordsQuery = () => {
  return `
      query listDailyRecords {
      listDailyRecords {
        items {
          id
          date
          exerciseBeforeWork
          takeDailySupplements
          meditationToTime
          dietFollowed
          noPhone
          distractionBlockerOnAndUpdated
          scrollingResisted
          startDayWithPlan
          dailyReflection
          dailyPlan
        }
      }
    }`;
};
