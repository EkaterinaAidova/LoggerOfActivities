import { Activity } from './activity.model';
import { Project } from './project.model';
export class TimeLog {
    TaskID: number;
    UserID: number;
    Project: Project;
    Activity: Activity;
    Status: number;
    StartWorkTime: Date;
    LastPauseTime: Date;
    LastResumeTime: Date;
    EndWorkTime: Date;
    SpendingTime: number;
}