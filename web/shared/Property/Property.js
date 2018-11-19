/* @flow */

import React from 'react';
import { graphql } from 'react-relay';
import { Flex, Box } from '@rebass/grid/emotion';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from '../../controls/link';

import {
  type FragmentRefs,
  createFragment,
  createMutation,
} from '../../controls/relay';

import type { Property_property } from './__generated__/Property_property.graphql';
import type { PropertyUpsertMutation } from './__generated__/PropertyUpsertMutation.graphql';

type PropertyData = {|
  lead?: Property_property,
|};

const PropertyFragment = createFragment<PropertyData>(
  graphql`
    fragment Property_property on Property {
      id
      livingSurface
      landSurface
      numberOfRooms
      numberOfParkings
    }
  `
);

const PropertyUpsertLead = createMutation<PropertyUpsertMutation, {}>(graphql`
  mutation PropertyUpsertMutation($input: UpsertPropertyInput!) {
    upsertProperty(input: $input) {
      property {
        id
        livingSurface
        landSurface
        numberOfRooms
        numberOfParkings
      }
    }
  }
`);

type Props = {|
  ...FragmentRefs<PropertyData>,
  step?: string,
|};

export const Property = (props: Props) => {
  return (
    <>
      <PropertyFragment property={props.property}>
        {({ property }) => (
          <Flex
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <Box>
              <div>{JSON.stringify(property)}</div>
              <Link href={{ pathname: '/' }}>
                <Button
                  to="/"
                  color="primary"
                  variant="contained"
                  css={{ marginTop: 40 }}
                >
                  Back to listing
                </Button>
              </Link>
            </Box>
            <Paper
              css={{ maxWidth: 960, marginTop: 16, width: '100%', padding: 16 }}
            >
              <PropertyUpsertLead>
                {({ mutate }) => (
                  <Box>
                    <Typography variant="h6">Property</Typography>
                    <Formik
                      initialValues={{
                        livingSurface: 120.1,
                        landSurface: 1200.2,
                        numberOfRooms: 4,
                        numberOfParkings: 2,
                      }}
                      onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                          alert(JSON.stringify(values, null, 2));
                          // setSubmitting(true);
                        }, 500);

                        setSubmitting(true);
                        mutate(values, () => {}, () => {});
                      }}
                      validationSchema={Yup.object().shape({
                        livingSurface: Yup.number().required('Required'),
                        landSurface: Yup.number().required('Required'),
                        numberOfRooms: Yup.number().required('Required'),
                        numberOfParkings: Yup.number()
                          .integer()
                          .required('Required'),
                      })}
                    >
                      {props => {
                        const {
                          values,
                          dirty,
                          isSubmitting,
                          handleChange,
                          handleSubmit,
                          handleReset,
                        } = props;
                        return (
                          <form onSubmit={handleSubmit}>
                            <div>
                              <Grid
                                container
                                direction="row"
                                justify="flex-start"
                                alignItems="flex-start"
                              >
                                <Grid item md>
                                  <TextField
                                    id="livingSurface"
                                    label="Living Surface"
                                    margin="normal"
                                    type="number"
                                    InputProps={{
                                      inputProps: { step: '0.01' },
                                    }}
                                    value={values.livingSurface}
                                    onChange={handleChange}
                                  />
                                </Grid>
                                <Grid item md>
                                  <TextField
                                    id="landSurface"
                                    label="Land Surface"
                                    margin="normal"
                                    type="number"
                                    InputProps={{
                                      inputProps: { step: '0.01' },
                                    }}
                                    value={values.landSurface}
                                    onChange={handleChange}
                                  />
                                </Grid>
                              </Grid>
                              <Grid
                                container
                                direction="row"
                                justify="flex-start"
                                alignItems="flex-start"
                              >
                                <Grid item md>
                                  <TextField
                                    id="numberOfRooms"
                                    label="Number of Rooms"
                                    type="number"
                                    InputProps={{ inputProps: { step: '1' } }}
                                    margin="normal"
                                    value={values.numberOfRooms}
                                    onChange={handleChange}
                                  />
                                </Grid>
                                <Grid item md>
                                  <TextField
                                    id="numberOfParkings"
                                    label="Number of Parkings"
                                    InputProps={{ inputProps: { step: '1' } }}
                                    type="number"
                                    margin="normal"
                                    value={values.numberOfParkings}
                                    onChange={handleChange}
                                  />
                                </Grid>
                              </Grid>
                              <Button
                                variant="contained"
                                type="button"
                                className="outline"
                                onClick={handleReset}
                                disabled={!dirty || isSubmitting}
                                css={{ margin: 16 }}
                              >
                                Reset
                              </Button>
                              <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                css={{ margin: 16 }}
                              >
                                Submit
                              </Button>
                            </div>
                          </form>
                        );
                      }}
                    </Formik>
                  </Box>
                )}
              </PropertyUpsertLead>
            </Paper>
          </Flex>
        )}
      </PropertyFragment>
    </>
  );
};
