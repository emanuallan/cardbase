import React, { useState, FC } from "react";
import { NFL_HIERARCHY } from "api/NFLHIERARCHY";
import { Flex, Text, Box, Image, HStack } from "@chakra-ui/react";

function TeamSelector() {
	console.log(NFL_HIERARCHY);
	return (
		<Box>
			<Box mx="auto" maxW="max-content">
				<HStack mb="12">
					{NFL_HIERARCHY.conferences[0].divisions.map((division) => (
						<DivisionGroup key={division.id} division={division.name} divisionTeams={division.teams} />
					))}
				</HStack>
				<HStack>
					{NFL_HIERARCHY.conferences[1].divisions.map((division) => (
						<DivisionGroup key={division.id} division={division.name} divisionTeams={division.teams} />
					))}
				</HStack>
			</Box>
		</Box>
	);
}

interface DivisionGroupProps {
	divisionTeams: any[]; //eventually Team object
	division: string;
}
const DivisionGroup: FC<DivisionGroupProps> = ({ divisionTeams, division }) => {
	return (
		<Box flex="1" justifyContent="center">
			<Text fontWeight="bold" color="gray.400" mb="3">
				{division}
			</Text>

			{divisionTeams?.map((team) => (
				<TeamButton
					key={team.id}
					image="https://assets-sports.thescore.com/football/team/14/logo.png"
					name={`${team.market} ${team.name}`}
					primaryColor={team?.team_colors?.[1]?.hex_color}
					secondaryColor={team?.team_colors?.[0]?.hex_color}
				/>
			))}
		</Box>
	);
};

interface TeamButtonProps {
	image: string;
	name: string;
	primaryColor?: string;
	secondaryColor?: string;
}
const TeamButton: FC<TeamButtonProps> = ({ image, name, primaryColor = "black", secondaryColor = "white" }) => {
	const [selected, setSelected] = useState(false);
	const [hovered, setHovered] = useState(false);

	return (
		<Flex
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			onClick={() => setSelected(!selected)}
			cursor="pointer"
			mt="1"
			borderRadius="lg"
			color={selected ? "white" : "black"}
			bg={selected ? primaryColor : "white"}
			p="2"
			alignItems="center"
			w="14.4em"
		>
			<Image src={image} w="auto" h="35px" />{" "}
			<Text ml="2" fontWeight={hovered || selected ? "bold" : "medium"}>
				{name}
			</Text>
		</Flex>
	);
};

export default TeamSelector;
