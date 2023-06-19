import { FeedbackState } from "./modules/Feedbacks";
import { ThemeState } from "./modules/Theme";
export interface DatesState {
  selectedMonth: Date;
}
export default interface State {
  themes: ThemeState;
  dates: DatesState;
  feedbacks: FeedbackState;
  menus: string;

}
