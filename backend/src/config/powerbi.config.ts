import dotenv from 'dotenv';

dotenv.config();

export const powerBiConfig = {
    clientId: process.env.CLIENT_ID_DE_POWER_BI,
    authorityUrl: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
    scopes: [
        `https://analysis.windows.net/powerbi/api/.default`
    ],
    clientSecret: process.env.CLIENT_SECRET,
    workspaceId: process.env.ID_SPACE_POWER_BI,
    reportId: process.env.ID_REPORT_POWER_BI
};
