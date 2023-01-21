import { createMachine, assign } from "xstate";

interface ToggleContext {
  count: number;
}

type ToggleEvents = { type: "TOGGLE" };

export const toggleMachine = createMachine<ToggleContext, ToggleEvents>({
  id: "toggle",
  initial: "inactive",
  context: {
    count: 0,
  },
  states: {
    inactive: {
      on: { TOGGLE: "active" },
    },
    active: {
      entry: assign({ count: (ctx) => ctx.count + 1 }),
      on: { TOGGLE: "inactive" },
    },
  },
  predictableActionArguments: true,
});

interface InterfaceContext {
  message: string;
  amount: number;
}

type InterfaceEvents = {
  type:
    | "EventMessageRecieved"
    | "UpdateHealth"
    | "UpdateAmmo"
    | "UpdateLocation"
    | "UpdateExperience";
  context: any;
};

export const interfaceListenerMachine = createMachine<
  InterfaceContext,
  InterfaceEvents
>({
  id: "ReactUnityMessageListener",
  initial: "ListenForMessage",
  context: { message: "default", amount: 0 },
  states: {
    ParseMessage: {
      entry: assign({
        message: (context, event) => {
          console.log("assign message - context: ", context, "event", event);
          return event?.context?.message || "updated";
        },
        amount: (context, event) => {
            console.log("assign amount - context: ", context, "event", event);
            return event?.context?.count || 0;
          },
      }),
      on: {
        UpdateHealth: {
          target: "InterfaceUpdated",
        },
        UpdateAmmo: {
          target: "InterfaceUpdated",
        },
        UpdateLocation: {
          target: "InterfaceUpdated",
        },
        UpdateExperience: {
          target: "InterfaceUpdated",
        },
      },
    },
    ListenForMessage: {
      on: {
        EventMessageRecieved: {
          target: "ParseMessage",
        },
      },
    },
    InterfaceUpdated: {
      always: {
        target: "ListenForMessage",
      },
    },
  },
  predictableActionArguments: true,
  preserveActionOrder: true,
});
