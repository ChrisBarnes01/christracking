import { createDailyRecordQuery, getDailyRecordsQuery } from "./queries";

const gqlEndpoint =
  "https://oa5lyd2bx5blnmcfgoi23m5yt4.appsync-api.us-east-1.amazonaws.com/graphql";

export const fetchQuery = async (query: any) => {
  const resultPromise = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": "da2-37r7hsn7djgurokoepu2mwcdja",
    },
    body: JSON.stringify({ query: query }),
  });
  const resultResolved = await resultPromise.json();
  return resultResolved;
};

export const getRecords = async (setLoading, setRecords) => {
  try {
    setLoading(true);
    const resultResolved = await fetchQuery(getDailyRecordsQuery());
    console.log("Result resolved is", resultResolved);
    console.log(
      "Daily records are",
      resultResolved?.data?.listDailyRecords?.items
    );
    setRecords(resultResolved?.data?.listDailyRecords?.items);
    setLoading(false);
  } catch (error) {
    console.log(error);
    console.log(error.message);
    setLoading(false);
  }
};

export const createRecord = async (
  setLoading,
  setRecords,
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
  try {
    setLoading(true);

    console.log(
      "Mutation is",
      createDailyRecordQuery(
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
      )
    );
    const queryResults = await fetchQuery(
      createDailyRecordQuery(
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
      )
    );
    console.log("queryResults");
    setLoading(false);
    getRecords(setLoading, setRecords);
  } catch (error) {
    console.log(error);
    console.log(error.message);
    setLoading(false);
  }
};
