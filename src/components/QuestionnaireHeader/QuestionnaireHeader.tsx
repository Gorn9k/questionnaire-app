import {Textarea} from "@mantine/core";
import React from "react";

export const QuestionnaireHeader = () => {

    return <>
        <Textarea
            size="xl"
            radius="xs"
            label="Тема опроса"
            withAsterisk
            autosize
        />
        <Textarea
            size="xl"
            radius="xs"
            label="Описание опроса"
            withAsterisk
            autosize
        />
    </>
}