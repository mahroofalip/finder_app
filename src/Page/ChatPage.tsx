import {
  Avatar,
  Badge,
  Box,
  CardHeader,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { styled } from "@mui/material/styles";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";

const OnlineBadge = () => (
  <span
    style={{
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: "#03fc5e",
      display: "inline-block",
      marginLeft: 5,
    }}
  />
);
const GrayLabel = styled(Typography)({
  color: "gray",
  marginTop: 10,
});
const OfflineBadge = () => (
  <span
    style={{
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: "gray",
      display: "inline-block",
      marginLeft: 5,
    }}
  />
);
export default function ChatPage(props:any) {
  return (
    <>
      <Box style={{ border: "1px solid #ded9d9", borderRadius: "5px" }}>
        <div>
          <CardHeader
            sx={{ backgroundColor: "#f2f7f4" }}
            avatar={
              <>
                <ArrowBackIcon />
                <Badge
                  overlap="circular"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  sx={{marginLeft:5}}
                >
                  <Avatar
                    aria-label="recipe"
                    src={"https://randomuser.me/api/portraits/thumb/men/40.jpg"}
                  />
                </Badge>
              </>
            }
            title={
              <Typography variant="body1" color={"black"}>
                Mahroof ali, 28, Malappuram
              </Typography>
            }
            subheader={
              <Typography>
                {`${4} Min ago`} <OnlineBadge />
              </Typography>
            }
          />
        </div>

        <div
          style={{
            border: "1px solid #ded9d9",
            minHeight: 200,
            padding: 15,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: 10,
            }}
          >
            <div
              style={{
                alignSelf: "flex-start",
                backgroundColor: "white",
                padding: 5,
                paddingRight: 15,
                paddingLeft: 15,
                marginBottom: 5,
                borderRadius: 5,
                border: "1px solid #ded9d9",
              }}
            >
              <div>Hi</div>
              <div style={{ fontSize: 12 }}>10:00 AM</div>
            </div>
            <div
              style={{
                alignSelf: "flex-end",
                backgroundColor: "#d8e1f9",
                padding: 5,
                paddingLeft: 15,
                paddingRight: 15,
                marginBottom: 5,
                borderRadius: 5,
                border: "1px solid #ded9d9",
              }}
            >
              <div>HI Hello</div>
              <div style={{ fontSize: 12 }}>10:05 AM</div>
            </div>
            <div
              style={{
                alignSelf: "flex-start",
                backgroundColor: "white",
                padding: 5,
                paddingLeft: 15,
                paddingRight: 15,
                marginBottom: 5,
                borderRadius: 5,
                border: "1px solid #ded9d9",
              }}
            >
              <div>How are you?</div>
              <div style={{ fontSize: 12 }}>10:10 AM</div>
            </div>
            <div
              style={{
                alignSelf: "flex-end",
                backgroundColor: "#d8e1f9",
                padding: 5,
                paddingLeft: 15,
                paddingRight: 15,
                marginBottom: 5,
                borderRadius: 5,
                border: "1px solid #ded9d9",
              }}
            >
              <div>I'm Fine!</div>
              <div style={{ fontSize: 12 }}>10:15 AM</div>
            </div>
            <div
              style={{
                alignSelf: "flex-start",
                backgroundColor: "white",
                padding: 5,
                paddingLeft: 15,
                paddingRight: 15,
                marginBottom: 5,
                borderRadius: 5,
                border: "1px solid #ded9d9",
              }}
            >
              <div>Good!</div>
              <div style={{ fontSize: 12 }}>10:20 AM</div>
            </div>

            
          </div>
          <TextField
            fullWidth
            id="standard-error-helper-text"
            defaultValue="Hi there!"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility">
                    <SendIcon sx={{ color: "#03befc" }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
      </Box>
    </>
  );
}
