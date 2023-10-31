import { Backdrop, CircularProgress } from "@mui/material";

function Loading() {

  return (
    <div className="Loading">
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <CircularProgress color="inherit" />
        </Backdrop>
    </div>
  )

}

export default Loading;