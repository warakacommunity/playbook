---
title: "Chat"
sidebar_label: "Chat"
description: "Object tag — The `Chat` tag displays a conversational transcript and lets annotators"
mdx:
  format: md
---

# `<Chat>`

**Category:** Object tag

The `Chat` tag displays a conversational transcript and lets annotators
extend it with new messages during labeling. The initial transcript is
provided from task data via the `value` attribute.

Optionally, the tag can request automatic replies from an LLM model. To do so,
set the `llm` attribute to a model in the format `<provider>/<model>`.

Messages can be edited by clicking the edit button that appears on hover for
user-created messages (messages from annotation results). System messages from
task data cannot be edited.

Use with the following data types: JSON array of message objects.

Message object format (task data):
- `role`    — speaker identifier; supported roles: `user`, `assistant`, `system`, `tool`, `developer`
- `content` — message text

Example task data:
```json
{
  "dialog": [
    {"role": "system", "content": "Welcome to the assistant."},
    {"role": "user", "content": "Hello!"}
  ]
}
```

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| name | string | **yes** | — | Name of the element |
| value | string | **yes** | — | Data field containing an array of chat messages or empty array |
| messageroles | string | no | — | Comma-separated list of roles that the user can create and send messages on behalf of. Default is "user" if the `llm` parameter is set; default is "user,assistant" if not. |
| editable | true,false | no | — | Whether messages are editable. Use true/false, or a comma-separated list of roles that are editable |
| minmessages | string,number | no | — | Minimum total number of messages required to submit |
| maxmessages | string,number | no | — | Maximum total number of messages allowed |
| llm | string | no | — | Model used to enable automatic assistant replies, format: `<provider>/<model>` |

## Examples

### Example `<Chat>` tag

The following labeling configuration is the most basic implementation of the Chat tag. Adding a self-referencing `toName` parameter allows you to use it without any other control tags. 

This labeling configuration would allow an annotator to submit messages from different roles that they select in a drop down message. 

```xml
<View>
  <Chat name="chat" value="$chat" toName="chat" />
</View>
```

You can extend this configuration by allowing auto-replies from an LLM and adding control tags to evaluate the messages, as seen in the example below.

### Example labeling config

Evaluate assistant responses:

```xml
<View>
  <Style>
    .htx-chat{flex-grow:1}
    .htx-chat-sidepanel{flex:300px 0 0;display:flex;flex-direction:column;border-left:2px solid #ccc;padding-left:16px}
  </Style>
  <View style="display:flex;width:100%;gap:1em">
    <Chat name="chat" value="$chat" llm="openai/gpt-4.1-nano" minMessages="4" maxMessages="10" editable="true" />
    <View className="htx-chat-sidepanel">
      <View style="position:sticky;top:14px">
        <!-- Invitation/explanation on how to evaluate -->
        <View visibleWhen="no-region-selected">
          <Text name="_3" value="Click on a message to rate specific parts of the conversation"/>
        </View>
        <!-- Evaluate assistant messages -->
        <View visibleWhen="region-selected" whenRole="assistant">
          <Text name="_1" value="Rate the response" />
          <Rating name="response_rating" toName="chat" perRegion="true" />
        </View>
      </View>
      <!-- Evaluate the whole conversation -->
      <View style="margin-top:auto;height:130px">
        <Header size="4">Overall quality of this conversation</Header>
        <Rating name="rating" toName="chat" />
      </View>
    </View>
  </View>
</View>
```

## Example input data

