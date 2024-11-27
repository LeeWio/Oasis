"use client";
import React, { Dispatch, SetStateAction, useState, DragEvent } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { Select, SelectItem } from "@nextui-org/select";
import { Card as NextUICard, CardBody } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";

export const Kanban = () => {
  const [cards, setCards] = useState(DEFAULT_CARDS);
  const [filter, setFilter] = useState("all");
  const [isDragging, setIsDragging] = useState(false);

  const filteredCards =
    filter === "all"
      ? cards
      : cards.filter((card) => card.owner.name === filter);

  const owners = Array.from(new Set(cards.map((card) => card.owner.name)));

  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-auto p-6 scrollbar-hide">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
            Sales Pipeline
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total Leads: {cards.length}
          </p>
        </div>
        <Select
          className="max-w-xs"
          color="primary"
          items={["all", ...owners].map((owner) => ({
            label: owner,
            value: owner,
          }))}
          placeholder="Filter by owner"
          variant="bordered"
          onChange={(e) => setFilter(e.target.value)}
        >
          {(item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label === "all" ? "All" : item.label}
            </SelectItem>
          )}
        </Select>
      </div>
      <div className="flex min-h-[600px] gap-4">
        <Column
          cards={filteredCards}
          column="qualification"
          headingColor="text-neutral-900 dark:text-neutral-500"
          setCards={setCards}
          setIsDragging={setIsDragging}
          title="Qualification"
        />
        <Column
          cards={filteredCards}
          column="engagement"
          headingColor="text-neutral-900 dark:text-neutral-500"
          setCards={setCards}
          setIsDragging={setIsDragging}
          title="Engagement"
        />
        <Column
          cards={filteredCards}
          column="proposal"
          headingColor="text-neutral-9000 dark:text-neutral-500"
          setCards={setCards}
          setIsDragging={setIsDragging}
          title="Proposal"
        />
        <Column
          cards={filteredCards}
          column="negotiation"
          headingColor="text-neutral-9000 dark:text-neutral-500"
          setCards={setCards}
          setIsDragging={setIsDragging}
          title="Negotiation"
        />
        <Column
          cards={filteredCards}
          column="closure"
          headingColor="text-neutral-9000 dark:text-neutral-500"
          setCards={setCards}
          setIsDragging={setIsDragging}
          title="Closure"
        />
      </div>
      {isDragging && (
        <div className="mt-4 flex justify-center">
          <BurnBarrel setCards={setCards} setIsDragging={setIsDragging} />
        </div>
      )}
    </div>
  );
};

type ColumnProps = {
  title: string;
  headingColor: string;
  cards: CardType[];
  column: ColumnType;
  setCards: Dispatch<SetStateAction<CardType[]>>;
  setIsDragging: Dispatch<SetStateAction<boolean>>;
};

const Column = ({
  title,
  headingColor,
  cards,
  column,
  setCards,
  setIsDragging,
}: ColumnProps) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e: DragEvent, card: CardType) => {
    e.dataTransfer.setData("cardId", card.id);
    setIsDragging(true);
  };

  const handleDragEnd = (e: DragEvent) => {
    const cardId = e.dataTransfer.getData("cardId");

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);

      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, column };

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);

        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy);
    }
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    highlightIndicator(e);

    setActive(true);
  };

  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e: DragEvent) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e: DragEvent, indicators: HTMLElement[]) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      },
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll(
        `[data-column="${column}"]`,
      ) as unknown as HTMLElement[],
    );
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const filteredCards = cards.filter((c) => c.column === column);

  return (
    <div className="w-80 shrink-0">
      <div className="mb-4 flex items-center justify-between">
        <h3 className={`text-lg font-semibold ${headingColor}`}>{title}</h3>
        <span className="rounded-full bg-gray-200 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
          {filteredCards.length}
        </span>
      </div>
      <div
        className={`h-[calc(100%-2rem)] w-full overflow-y-auto rounded-xl border border-gray-200 bg-gray-100 p-2 transition-colors dark:border-gray-700 dark:bg-gray-900 ${
          active ? "bg-gray-200 dark:bg-gray-800" : ""
        }`}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDragEnd}
      >
        <AnimatePresence>
          {filteredCards.map((c) => (
            <Card key={c.id} {...c} handleDragStart={handleDragStart} />
          ))}
        </AnimatePresence>
        <DropIndicator beforeId={null} column={column} />
      </div>
    </div>
  );
};

type CardProps = CardType & {
  handleDragStart: Function;
};

const Card = ({ title, id, column, owner, handleDragStart }: CardProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStartWrapper = (e: React.DragEvent) => {
    setIsDragging(true);
    handleDragStart(e, { title, id, column, owner });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        initial={{ opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        whileDrag={{
          scale: 1.05,
          zIndex: 1,
          boxShadow: "0 8px 15px rgba(0,0,0,0.15)",
        }}
      >
        <NextUICard
          isHoverable
          isPressable
          className={`mb-2 w-full transition-all duration-200 ${
            isDragging
              ? "border-2 border-primary-500 bg-primary-100 dark:bg-primary-900/20"
              : "bg-white dark:bg-gray-800"
          }`}
          draggable="true"
          shadow="sm"
          onDragEnd={handleDragEnd as any}
          onDragStart={handleDragStartWrapper as any}
        >
          <CardBody className="p-3">
            <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              {title}
            </h4>
            <div className="mt-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6 text-tiny" src={owner.avatar} />
                <span>{owner.name}</span>
              </div>
            </div>
          </CardBody>
        </NextUICard>
      </motion.div>
    </>
  );
};

type DropIndicatorProps = {
  beforeId: string | null;
  column: string;
};

const DropIndicator = ({ beforeId, column }: DropIndicatorProps) => {
  return (
    <div
      className="my-0.5 h-0.5 w-full"
      data-before={beforeId || "-1"}
      data-column={column}
    />
  );
};

const BurnBarrel = ({
  setCards,
  setIsDragging,
}: {
  setCards: Dispatch<SetStateAction<CardType[]>>;
  setIsDragging: Dispatch<SetStateAction<boolean>>;
}) => {
  const [active, setActive] = useState(false);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDrop = (e: DragEvent) => {
    const cardId = e.dataTransfer.getData("cardId");

    setCards((prev) => prev.filter((c) => c.id !== cardId));
    setActive(false);
    setIsDragging(false);
  };

  return (
    <Button
      aria-label="Delete card"
      className={`grid h-16 w-full place-content-center rounded-lg text-xl transition-colors ${
        active
          ? "border-2 border-red-500 bg-red-100 text-red-500 dark:bg-red-900/20"
          : "border-2 border-neutral-300 bg-neutral-100 text-neutral-400 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-500"
      }`}
      role="button"
      tabIndex={0}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <Icon
        className={
          active ? "text-red-500" : "text-neutral-400 dark:text-neutral-500"
        }
        height={24}
        icon={active ? "solar:trash-bin-2-bold" : "solar:trash-bin-2-linear"}
        width={24}
      />
    </Button>
  );
};

type AddCardProps = {
  column: ColumnType;
  setCards: Dispatch<SetStateAction<CardType[]>>;
};

type ColumnType =
  | "qualification"
  | "engagement"
  | "proposal"
  | "negotiation"
  | "closure";

type CardType = {
  title: string;
  id: string;
  column: ColumnType;
  owner: {
    name: string;
    avatar: string;
  };
};

const DEFAULT_CARDS: CardType[] = [
  {
    title: "Equinor ASA",
    id: "5",
    column: "qualification",
    owner: {
      name: "Ingrid Olsen",
      avatar: "https://i.pravatar.cc/150?u=alice",
    },
  },
  {
    title: "DNB ASA",
    id: "6",
    column: "qualification",
    owner: { name: "Lars Hansen", avatar: "https://i.pravatar.cc/150?u=bob" },
  },
  {
    title: "Telenor ASA",
    id: "7",
    column: "qualification",
    owner: {
      name: "Kari Andersen",
      avatar: "https://i.pravatar.cc/150?u=charlie",
    },
  },
  {
    title: "Orkla ASA",
    id: "8",
    column: "engagement",
    owner: {
      name: "Erik Johansen",
      avatar: "https://i.pravatar.cc/150?u=david",
    },
  },
  {
    title: "Yara International ASA",
    id: "9",
    column: "engagement",
    owner: { name: "Astrid Berg", avatar: "https://i.pravatar.cc/150?u=emily" },
  },
  {
    title: "Norsk Hydro ASA",
    id: "10",
    column: "proposal",
    owner: {
      name: "Bjørn Larsen",
      avatar: "https://i.pravatar.cc/150?u=frank",
    },
  },
  {
    title: "Aker Solutions ASA",
    id: "11",
    column: "negotiation",
    owner: {
      name: "Silje Pedersen",
      avatar: "https://i.pravatar.cc/150?u=george",
    },
  },
  {
    title: "Schibsted ASA",
    id: "12",
    column: "closure",
    owner: {
      name: "Magnus Nilsen",
      avatar: "https://i.pravatar.cc/150?u=hannah",
    },
  },
];
