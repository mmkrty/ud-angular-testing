import { TestBed, inject } from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing"
import { CoursesService } from "./courses.service"
import { COURSES } from "../../../../server/db-data";

describe("CourseService", ()=>{

    let coursesService: CoursesService,
        httpTestingController: HttpTestingController

    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                CoursesService,
            ]
        })

        coursesService = TestBed.get<CoursesService>(CoursesService)
        httpTestingController = TestBed.get(HttpTestingController)
    })

    // beforeEach(() => {
    //     TestBed.configureTestingModule({
    //       imports: [HttpClientTestingModule],
    //       providers: [
    //         CoursesService,
    //       ],
    //     });
      
    //     inject([CoursesService, HttpTestingController], (service: CoursesService, httpMock: HttpTestingController) => {
    //       coursesService = service;
    //       httpTestingController = httpMock;
    //     })();
    //   });
      
      

    it("should retrieve all the courses", ()=>{

        coursesService.findAllCourses().subscribe(courses=>{

            expect(courses).toBeTruthy('No course returned')

            expect(courses.length).toBe(12, 'Incorrect number of courses')

            const course = courses.find(course => course.id == 12)

            expect(course.titles.description).toBe('Angular Testing Course')
        })

        // intercept an HTTP request made by the CoursesService. 
        // We expect the request to use the GET method and to request the /api/courses endpoint
        const req = httpTestingController.expectOne('/api/courses')

        expect(req.request.method).toEqual('GET')

        // provide a mock response, using the COURSES data defined in the db-data.ts file.
        req.flush({payload: Object.values(COURSES)})
    })

})