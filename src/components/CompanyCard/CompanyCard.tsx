import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { ICompany } from '../../ducks/company';
import classes from './CompanyCard.scss';

export interface ICompanyCardProps {
  company: ICompany,
};

class CompanyCard extends React.Component<ICompanyCardProps> {
  public render() {
    const company = this.props.company;
    return (
        <Card className={classes.CompanyCard}>
          <CardContent>
            <a
              href={company.website}
              title={`Go to ${company.companyName} website`}
              className={classes.CompanyCardLink}
              target="_blank"
            >
              <Icon>open_in_new</Icon>
            </a>
            <Typography
              className={classes.CompanyCardCompanyName}
              color="textSecondary"
            >
              {company.companyName}
            </Typography>
            <Typography
              className={classes.CompanyCardCode}
              variant="headline"
              component="h2"
            >
              {company.symbol}
            </Typography>
            <Typography
              className={classes.CompanyCardSector}
              color="textSecondary"
            >
              {company.sector}
            </Typography>
            <Typography
              className={classes.CompanyCardCEO}
              color="textSecondary"
            >
              CEO: {company.CEO}
            </Typography>
            <Typography
              className={classes.CompanyCardDescription}
              color="textSecondary"
            >
              {company.description}
            </Typography>
            <div className={classes.CompanyCardTags}>
              {
                company.tags.map((tag:string) => (
                  <Chip
                    label={tag}
                    key={tag}
                    className={classes.CompanyCardTag}
                  />
                ))
              }
            </div>
          </CardContent>
        </Card>
    );
  }
}

export default CompanyCard;
