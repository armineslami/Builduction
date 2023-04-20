import { NextPage } from "next";
import Link from "next/link";
import {
  Center,
  Box,
  Heading,
  HStack,
  Spacer,
  Button,
  Icon,
} from "@chakra-ui/react";
import ProjectRow from "@/components/project";
import Empty from "@/components/empty";
import Project from "@/models/Project";
import { AiFillFolderAdd } from "react-icons/ai";
import DatabaseHelper from "@/models/database/DatabaseHelper";
import React, { useEffect, useState } from "react";
import Loading from "@/components/loading";

const HomePage: NextPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const dbHelper: DatabaseHelper = new DatabaseHelper();
    const projects: Project[] = dbHelper.fetch();
    setProjects(projects);
    setLoading(false);
  }, []); // empty array means that the useEffect hook should be called once and only after the first mount/render.

  const renderContent = () => {
    if (loading) {
      return <Loading size={"lg"} />;
    }

    return !projects?.length ? <Empty /> : renderProjects(projects);
  };

  /**
   * Creates an array of react element using {@link ProjectRow} for each available project in given {@param projects} array.
   * @param projects - An array of project
   * @returns react element
   */
  function renderProjects(projects: Project[]): React.ReactElement[] {
    const projectRows: React.ReactElement[] = projects.map(
      (project: Project) => {
        return <ProjectRow project={project} key={project.id} />;
      }
    );
    return projectRows;
  }

  return (
    <Box>
      <Center>
        <Box
          position="relative"
          w={{
            base: "400px",
            sm: "100%",
            md: "75%",
            lg: "50%",
            xl: "%25",
            "2xl": "30%",
          }}
        >
          <HStack className="header">
            <Heading size="lg" mt="16px" mb="16px" fontWeight="bold">
              پروژه‌ها
            </Heading>
            <Spacer />
            <Link href="/project">
              <Button
                className="blackButton"
                leftIcon={<Icon as={AiFillFolderAdd} w={5} h={5} />}
                variant="solid"
              >
                افزودن
              </Button>
            </Link>
          </HStack>
          <Box position="relative" minH="500px" bg="white" p="16px">
            {renderContent()}
          </Box>
        </Box>
      </Center>
    </Box>
  );
};

export default HomePage;
