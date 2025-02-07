import { LocaleKey } from 'lib/interfaces/locale.interface';
import { MainContext } from 'lib/interfaces/mainContext.interface';
import { Row } from 'lib/interfaces/row';
import { Theme } from 'lib/interfaces/theme.interface';

export type GridProps = Omit<MainContext, 'theme' | 'locale'> & {
  title?: string;
  info?: string;
  column3?: string;
  data: Row[];
  theme?: Partial<Theme>;
  locale?: LocaleKey;
}
