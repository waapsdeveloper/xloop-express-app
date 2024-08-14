import * as crud from './../services/crudService';

export class JobService {
  
  async jobList(): Promise<any> {


    const sql = "select * from jobs order by id desc";
    const res = await crud.genericQuery(sql, [])
    return {
      status: 200,
      message: 'Job List',
      result: res,
    };
  }

  async myJobList(): Promise<any> {

    

    const sql = "select * from jobs order by id desc";
    const res = await crud.genericQuery(sql, [])
    return {
      status: 200,
      message: 'Job List',
      result: res,
    };
  }
}
