import { CircularProgressProps, Box, CircularProgress, Typography } from "@mui/material";

export default function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number },
  ) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex', justifyContent: 'center', padding: '12px' }}>
        <CircularProgress variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="caption"
            component="div"
            // color="var(--color-text-primary)"
            color="#000"
          >{`${Math.round(props.value)}%`}</Typography>
        </Box>
      </Box>
    );
  }