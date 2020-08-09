import { Request, Response } from 'express';

import { db } from '../database/connection';
import converterHourToMinute from '../utils/converterHourToMinute';

type ScheduleItem = {
  week_day: number;
  from: string,
  to: string,
};

type IndexQuery = {
  week_day: number;
  subject: string,
  time: string,
}

class ClassesController {
  async store(request: Request, response: Response) {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    } = request.body;

    const transaction = await db.transaction();

    try {
      const insertedUsersIds = await transaction('users').insert({
        name,
        avatar,
        whatsapp,
        bio,
      });

      const user_id = insertedUsersIds[0];

      const insertedClassesIds = await transaction('classes').insert({
        subject,
        cost,
        user_id,
      });

      const class_id = insertedClassesIds[0];

      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {

        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: converterHourToMinute(scheduleItem.from),
          to: converterHourToMinute(scheduleItem.to),
        };
      });

      await transaction('class_schedules').insert(classSchedule);

      await transaction.commit();

      return response.status(201).json();
    } catch (err) {
      await transaction.rollback();

      return response.status(400).json({
        error: 'Unexpected error while creating a new class',
      });
    };
  };

  async index(request: Request<{}, {}, {}, IndexQuery>, response: Response) {
    const filters = request.query;

    if (!filters.week_day || !filters.subject || !filters.time) {
      return response.status(400).json({
        error: 'Missing filters to search classes',
      });
    };

    const timeInMinutes = converterHourToMinute(filters.time);



    const classes = await db('classes')
      .whereExists(function () {
        this.select('class_schedules.*')
          .from('class_schedules')
          .whereRaw('`class_schedules`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedules`.`week_day` = ??', [Number(filters.week_day)])
          .whereRaw('`class_schedules`.`from` <= ??', [timeInMinutes])
          .whereRaw('`class_schedules`.`to` > ??', [timeInMinutes]);
      })
      .where('classes.subject', '=', filters.subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*']);

    return response.json(classes);
  };
};

export default new ClassesController();