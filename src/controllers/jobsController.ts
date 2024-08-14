import { Request, Response } from 'express';
import { successResponse } from "../helpers/response-helper";
import { JobService } from "../services/jobService";


const jobService = new JobService();

export const jobList = async (req: Request, res: Response) => { 

    const response = await jobService.jobList();

    return successResponse(res, response.message, {
        data: response.result,
      });
}
