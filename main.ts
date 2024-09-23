import fetch from 'node-fetch';

async function action(headers: Record<string, string>): Promise<boolean> {
  try {
    const res = await fetch(
      "https://dev-api.goatsbot.xyz/missions/action/66db47e2ff88e4527783327e",
      {
        method: "POST",
        headers,
      }
    );

    if (!res.ok) {
      console.error(`Action request failed: ${res.status} ${res.statusText}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in action:', error);
    return false;
  }
}

async function getNextTime(headers: Record<string, string>): Promise<number> {
  try {
    const res = await fetch("https://api-mission.goatsbot.xyz/missions/user", {
      headers,
    });

    if (!res.ok) {
      console.error(`Get missions request failed: ${res.status} ${res.statusText}`);
      return 20000000000; // زمان پیش‌فرض
    }

    const data = await res.json();
    return data["SPECIAL MISSION"][0]["next_time_execute"];
  } catch (error) {
    console.error('Error in getNextTime:', error);
    return 20000000000; // زمان پیش‌فرض
  }
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function handleToken(authToken: string): Promise<void> {
  const headers: Record<string, string> = { Authorization: `Bearer ${authToken}` };
  let nextTime = await getNextTime(headers);

  while (true) {
    const now = Math.floor(Date.now() / 1000);
    
    if (now >= nextTime) {
      const result = await action(headers);
      if (result) {
        console.log(`Success: Action to earn was successfully completed with token ${authToken}`);
        nextTime = await getNextTime(headers);
        console.log(`Success: Got new nextTime with token ${authToken}: ${nextTime}`);
      } else {
        console.log(`Failed: Action to earn failed with token ${authToken}`);
      }
    } else {
      // console.log(`Waiting: Time left for next action with token ${authToken}: ${nextTime - now}s`);
    }

    await delay(1000);
  }
}

async function makeMoney(authTokens: string[]): Promise<void> {
  const promises = authTokens.map(token => handleToken(token));
  await Promise.all(promises);
}

// List of your authorization tokens
const authTokens: string[] = [
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjZlZjQ0MmU1MDIzMDkwNjNkODkwNzJmIiwiaWF0IjoxNzI3MDg2MTU5LCJleHAiOjE3MjcxNzI1NTksInR5cGUiOiJhY2Nlc3MifQ.eUrmRQhBtBq-uH0S1RoOfSsoRo6hCaunWVnFW8A6F6Q",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjZlN2ZhYzI2M2Y3Mzg1MGY4YjJjYTRiIiwiaWF0IjoxNzI3MDg3MjQzLCJleHAiOjE3MjcxNzM2NDMsInR5cGUiOiJhY2Nlc3MifQ._5dKgndhahz5eCGjOqcF9qngi8kLq3k6cjOTnY2vmqk",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjZkZGZiNjYxZjdmMGYxNGZmYzkxNDAyIiwiaWF0IjoxNzI3MDg3ODczLCJleHAiOjE3MjcxNzQyNzMsInR5cGUiOiJhY2Nlc3MifQ.5T8maHwUF6Prt9T-KtaQAyGXqYKlKoxFl1e7AkBeKUk",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjZlN2Y2OThmZjM0YmE2YzMyYzM3ZGFmIiwiaWF0IjoxNzI3MDg4MDUxLCJleHAiOjE3MjcxNzQ0NTEsInR5cGUiOiJhY2Nlc3MifQ.Ql0gEyia5_6yMimfSLUH3MO1RR-49arZAqb1UT1B6ZU",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjZlYzEwNTc2M2Y3Mzg1MGY4M2ZkN2Y1IiwiaWF0IjoxNzI3MDg4MTk1LCJleHAiOjE3MjcxNzQ1OTUsInR5cGUiOiJhY2Nlc3MifQ.-kJ41tA5-va-J67PtDem40QvKr7R9TyhA_VxNe9VvGQ",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjZlYzE2M2E5YTlkNTdkOTNmZmJhZDcxIiwiaWF0IjoxNzI3MDg4MzQ2LCJleHAiOjE3MjcxNzQ3NDYsInR5cGUiOiJhY2Nlc3MifQ.GQg3Hir-I87VMTM1r1xd_SqLGB5HUaHKrNdYTMVaxnY",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjZlYzE4YTM5YTlkNTdkOTNmMDAzODU4IiwiaWF0IjoxNzI3MDg4NDgwLCJleHAiOjE3MjcxNzQ4ODAsInR5cGUiOiJhY2Nlc3MifQ.vFctpVA7weAeer1ZJiDXTMoKY8RR3wY0_1DWzOENqf4",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjZlZTAzZDk1NGI2OTAxNzgwMDk5ZWE5IiwiaWF0IjoxNzI3MDg4NjEzLCJleHAiOjE3MjcxNzUwMTMsInR5cGUiOiJhY2Nlc3MifQ.UYirA2PUlq_7cvKgIXWIfCct4-RG1vr70byAUaMZAj4",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjZlZTA0NWMxMjM0Y2ZkYTZlZDc5Yjk5IiwiaWF0IjoxNzI3MDg4NzE0LCJleHAiOjE3MjcxNzUxMTQsInR5cGUiOiJhY2Nlc3MifQ.WgIGaO-qv8SdXjHXLacKHvdZfF8yAHCOzsH3hma245Q",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjZlZTA0ZTEyYTgxMGEwYjQ1OGJjMjI1IiwiaWF0IjoxNzI3MDkwODIxLCJleHAiOjE3MjcxNzcyMjEsInR5cGUiOiJhY2Nlc3MifQ.bizmIi8leHAQI7IkuHbMTsb4aRF9PiPC25esCDjIubk",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjZlZTA2NWEyYTgxMGEwYjQ1OGQ0NWU0IiwiaWF0IjoxNzI3MDkxMTMyLCJleHAiOjE3MjcxNzc1MzIsInR5cGUiOiJhY2Nlc3MifQ.EOf6Xs3NzLFr4an8jfpoZaaYIipR01r4KIzV8FROIpM",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjZlZjQzNTc1MDIzMDkwNjNkODc4YzRhIiwiaWF0IjoxNzI3MDkxMzg2LCJleHAiOjE3MjcxNzc3ODYsInR5cGUiOiJhY2Nlc3MifQ.cvwvcxBhjINWq60gptGGRqIBjoUTeYfUAEATHWq-_5g",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjZlZjQ0MmU1MDIzMDkwNjNkODkwNzJmIiwiaWF0IjoxNzI3MDkxNTc0LCJleHAiOjE3MjcxNzc5NzQsInR5cGUiOiJhY2Nlc3MifQ.Uj17uaarYLo6j1buP5FtoeHzBkuv5XYrtFTQFfmuemo",
]
  
  


makeMoney(authTokens);

console.log("Executed: Started...");
