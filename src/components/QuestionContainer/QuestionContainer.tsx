import {Checkbox, CheckIcon, Radio, Select, Table, Textarea} from "@mantine/core";
import React, {FC, useMemo, useState} from "react";
import {Choice, Question} from "../QuestionnaireBody/QuestionnaireBody";
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { IconGripVertical } from '@tabler/icons-react';
import cx from 'clsx';
import { Text } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import classes from './DndListHandle.module.css';

const data = [
    { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
    { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
    { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
    { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];

export function DndListHandle() {
    const [state, handlers] = useListState(data);

    const items = state.map((item, index) => (
        <Draggable key={item.symbol} index={index} draggableId={item.symbol}>
            {(provided, snapshot) => (
                <div
                    className={cx(classes.item, { [classes.itemDragging]: snapshot.isDragging })}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <div {...provided.dragHandleProps} className={classes.dragHandle}>
                        <IconGripVertical size={18} stroke={1.5} />
                    </div>
                    <Text className={classes.symbol}>{item.symbol}</Text>
                    <div>
                        <Text>{item.name}</Text>
                        <Text c="dimmed" size="sm">
                            Position: {item.position} • Mass: {item.mass}
                        </Text>
                    </div>
                </div>
            )}
        </Draggable>
    ));

    return (
        <DragDropContext
            onDragEnd={({ destination, source }) =>
                handlers.reorder({ from: source.index, to: destination?.index || 0 })
            }
        >
            <Droppable droppableId="dnd-list" direction="vertical">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {items}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export const QuestionContainer: FC<{
    question: Question,
    setQuestions: React.Dispatch<React.SetStateAction<Question[]>>
}> = ({question, setQuestions}) => {

    const [value, setValue] = useState<string | null>(null)
    const [checkBoxValues, setCheckBoxValues] = useState<string[]>([])

    return <div className={'question'}>
        <Textarea
            size="xl"
            radius="xs"
            label="Название вопроса"
            withAsterisk
            autosize
            className={'question__title'}
            value={question.name}
        />
        <Select
            label="Выберите тип выбора ответа"
            placeholder="Тип ответа"
            data={['Одиночный', 'Множественный', 'Табличный']}
            className={'question__selector'}
            checkIconPosition="right"
            value={question.choiceType}
            onChange={(newValue) => {
                setQuestions(oldQuestions => {
                    const newQuestions = [
                        ...oldQuestions.filter(oldQuestion => oldQuestion.id !== question.id)
                    ]
                    newQuestions.push({
                        ...oldQuestions.find(oldQuestions => oldQuestions.id === question.id),
                        choiceType: (newValue as Choice)
                    } as Question)
                    return newQuestions.sort((a, b) => a.id.localeCompare(b.id))
                })
            }}
        />
        {
            (question.choiceType === 'Одиночный' &&
                <Radio.Group
                    value={value}
                    onChange={setValue}
                    name="favoriteFramework"
                    withAsterisk
                >
                    {
                        question.answers.map(answer =>
                            <Radio key={answer.id} label={answer.name}
                                   onClick={() => setValue(answer.name === value ? null : answer.name)}/>)
                    }
                </Radio.Group>)
            || (question.choiceType === 'Множественный' &&
                <Checkbox.Group value={checkBoxValues} onChange={setCheckBoxValues}>
                    {
                        question.answers.map(answer => <Checkbox key={answer.id} label={answer.name}/>)
                    }
                </Checkbox.Group>
            )
            || (question.choiceType === 'Табличный' &&
                <Radio.Group
                    value={value}
                    onChange={setValue}
                    name="favoriteFramework"
                    withAsterisk
                >
                    <Table withRowBorders={false}>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th/>
                                <Table.Th>{question.answers.find(answer => answer.number.split('.')[1]
                                    === '0')?.name.split('~')[1]}</Table.Th>
                                <Table.Th>{question.answers.find(answer => answer.number.split('.')[1]
                                    === '1')?.name.split('~')[1]}</Table.Th>
                                <Table.Th>{question.answers.find(answer => answer.number.split('.')[1]
                                    === '2')?.name.split('~')[1]}</Table.Th>
                                <Table.Th>{question.answers.find(answer => answer.number.split('.')[1]
                                    === '3')?.name.split('~')[1]}</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {
                                question.answers.map((row, index) => {
                                    return <Table.Tr key={index}>
                                        <Table.Td>{row.name.split('.')[0]}</Table.Td>
                                        {
                                            question.answers.map((answer, cIndex) =>
                                                <Table.Td key={index + cIndex}>
                                                    <Radio key={answer.name + index + cIndex}
                                                           value={`${index}${cIndex}`}
                                                           onClick={() =>
                                                               setValue(`${index}${cIndex}` === value ? null : `${index}${cIndex}`)}/>
                                                </Table.Td>)
                                        }
                                    </Table.Tr>
                                })
                            }
                        </Table.Tbody>
                    </Table>
                </Radio.Group>
            )
        }
    </div>
}