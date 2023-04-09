import { NextPage } from "next";
import Link from "next/link";
import {
  Center,
  Box,
  Heading,
  HStack,
  Spacer,
  IconButton,
  Icon,
  Button,
  useToast,
  UseToastOptions,
} from "@chakra-ui/react";
import ProjectForm from "@/components/project/form";
import { BsFillTrash3Fill } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Project from "@/models/Project";
import { useRouter } from "next/router";
import DatabaseHelper from "@/models/database/DatabaseHelper";
import { useState } from "react";
import CalculationModal from "@/components/modal/calculation";
import SaveModal from "@/components/modal/save";
import DeleteModal from "@/components/modal/delete";
import Calculator from "@/models/Calculator";
import Loading from "@/components/loading";

const ProjectPage: NextPage = () => {
  // Create an instance of database helper
  const dbHelper = new DatabaseHelper();

  const router = useRouter();

  const toast = useToast();

  // Find the id of project if it's available in the router.
  const id = FindProjectIdFromRouter();

  // Create a null project object to fill it later using possible id in the router.
  var targetProject: Project | undefined = undefined;

  const [isCalcualtionModalOpen, setIsCalculationModalOpen] =
    useState<boolean>(false);

  const [isSaveConfirmModalOpen, setIsSaveConfirmModalOpen] =
    useState<boolean>(false);

  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] =
    useState<boolean>(false);

  const [project, setProject] = useState<Project>(new Project());

  const [loading, setLoading] = useState<boolean>(id !== undefined);

  if (id !== undefined && project.id !== id && loading) {
    targetProject = dbHelper.find(id);
    if (targetProject) setProject(targetProject);
    setLoading(false);
  }

  const [showDeleteButton, setShowDeleteButton] = useState<boolean>(
    targetProject ? true : false
  );

  function calculate(project: Project) {
    // Calculate the project
    const calculatedProject = Calculator.calculate(project);

    // Save calculated project into state
    setProject(calculatedProject);
  }

  function deleteProject(id: string) {
    // delete from storage
    const successful = dbHelper.delete(id);

    if (successful) {
      // set project state as new project
      setProject(new Project());

      // Since project is deleted, go back
      router.back();
    }
  }

  function saveProject(title: string) {
    project.title = title;

    // Save project
    const successful = dbHelper.addOrUpdate(project);

    // Update the state
    if (successful) {
      setProject(project);
      setShowDeleteButton(true);
      createToast("", "پروژه با موفقیت ذخیره شد.", "success");
    }
  }

  const createToast = (
    title: String,
    description: String,
    status: UseToastOptions["status"]
  ) => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 2000,
      isClosable: false,
    });
  };

  const renderContent = () => {
    if (loading) {
      return <Loading size={"lg"} />;
    }

    return (
      <>
        <ProjectForm
          project={project}
          onCalculate={(project) => {
            calculate(project);
            setIsCalculationModalOpen(true);
          }}
          onSave={(project) => {
            calculate(project);
            setIsSaveConfirmModalOpen(true);
          }}
        />
        <CalculationModal
          project={project!!}
          isModalOpen={isCalcualtionModalOpen}
          onModalClose={() => setIsCalculationModalOpen(false)}
        />
        <SaveModal
          projectTitle={project.title}
          isOpen={isSaveConfirmModalOpen}
          onSaveConfirm={(title) => saveProject(title)}
          onClose={() => setIsSaveConfirmModalOpen(false)}
        />
        <DeleteModal
          isOpen={isDeleteConfirmModalOpen}
          onDeleteConfirm={() => deleteProject(project.id)}
          onClose={() => setIsDeleteConfirmModalOpen(false)}
        />
      </>
    );
  };

  return (
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
          <Heading
            size="lg"
            mt="16px"
            mb="16px"
            fontWeight="bold"
            className="truncate"
          >
            {project.title ?? "محاسبه"}
          </Heading>
          <Spacer />
          {showDeleteButton ? (
            <IconButton
              aria-label="Trash"
              size="md"
              colorScheme="red"
              icon={
                <Icon
                  as={BsFillTrash3Fill}
                  w={5}
                  h={5}
                  onClick={() => setIsDeleteConfirmModalOpen(true)}
                />
              }
            />
          ) : null}

          <Link href="/">
            <Button
              className="blackButton"
              rightIcon={<AiOutlineArrowLeft />}
              variant="solid"
            >
              بازگشت
            </Button>
          </Link>
        </HStack>
        <Box position="relative" minH="500px" bg="white" p="16px">
          {renderContent()}
        </Box>
      </Box>
    </Center>
  );
};

function FindProjectIdFromRouter(): string | undefined {
  const router = useRouter();
  const { id } = router.query;
  return id ? (id as string) : undefined;
}

export default ProjectPage;
