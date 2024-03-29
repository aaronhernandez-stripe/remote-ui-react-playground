import { useState } from "react";
import { createRemoteReactComponent } from "@remote-ui/react";
import type {
  BoxProps,
  ButtonProps,
  NoPropsProps,
  TextFieldProps,
} from "app/host/remoteComponents";

// const Button = "Button" as any;
const Button = createRemoteReactComponent<"Button", ButtonProps, true>(
  "Button",
);
const Box = createRemoteReactComponent<"Box", BoxProps, true>("Box");
// const NoProps = "NoProps" as any;
// Still has children
const NoProps = createRemoteReactComponent<"NoProps", NoPropsProps, false>(
  "NoProps",
);
const TextField = createRemoteReactComponent<
  "TextField",
  TextFieldProps,
  false
>("TextField", {
  fragmentProps: ["label"],
});

export function RemoteApp({
  getMessage,
}: {
  getMessage: () => Promise<string>;
}) {
  const [message, setMessage] = useState("");

  return (
    <Box withBorder>
      ---- From remote ui iframe: ----
      <Box>Message from host: {message}</Box>
      <NoProps children={<>This should fail in TS</>} />
      <Button
        onPress={async () => {
          const message = await getMessage();
          setMessage(message);
          console.log(`Message from the host: ${message}`);
        }}
      >
        Log message in remote environment
      </Button>
    </Box>
  );
}
