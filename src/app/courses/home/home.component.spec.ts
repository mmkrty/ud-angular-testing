import { filter } from 'rxjs/operators';
import { CoursesService } from './../services/courses.service';
import {async, ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed, waitForAsync} from '@angular/core/testing';
import {CoursesModule} from '../courses.module';
import {DebugElement} from '@angular/core';

import {HomeComponent} from './home.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import {COURSES} from '../../../../server/db-data';
import {setupCourses} from '../common/setup-test-data';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {click} from '../common/test-utils';





describe('HomeComponent', () => {

  let fixture: ComponentFixture<HomeComponent>;
  let component:HomeComponent;
  let el: DebugElement;
  let coursesService: any;

  const beginnerCourses = setupCourses().filter(course => course.category == "BEGINNER");
  const advancedCourses = setupCourses().filter(course => course.category == "ADVANCED");

  beforeEach (waitForAsync((() => {

    const coursesServiceSpy = jasmine.createSpyObj('CoursesService', ['findAllCourses'])

    TestBed.configureTestingModule({
      imports: [
        CoursesModule,
        NoopAnimationsModule
      ],
      providers: [
        {provide: CoursesService, useValue: coursesServiceSpy}
      ]
    }).compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(HomeComponent)
      component = fixture.componentInstance;
      el = fixture.debugElement;
      coursesService = TestBed.get(CoursesService)
    })

    })
  ));

  it("should create the component", () => {

    expect(component).toBeTruthy();

  });


  it("should display only beginner courses", () => {

    loadCourses(beginnerCourses)

    const tabs = el.queryAll(By.css(".mdc-tab"));

    expect(tabs.length).toBe(1, "Unexpected number of tabs");

  });


  it("should display only advanced courses", () => {

    loadCourses(advancedCourses)

    const tabs = el.queryAll(By.css(".mdc-tab"));

    expect(tabs.length).toBe(1, "Unexpected number of tabs");

  });


  it("should display both tabs", () => {
    loadCourses()

    const tabs = el.queryAll(By.css(".mdc-tab"));

    expect(tabs.length).toBe(2, "Unexpected number of tabs");

  });


  it("should display advanced courses when tab clicked", () => {

    loadCourses();

    const tabs = el.queryAll(By.css(".mdc-tab"));

    click(tabs[1]);

    fixture.detectChanges();

    const cardTitles = el.queryAll(By.css('.mat-mdc-card-title'));

    expect(cardTitles.length).toBeGreaterThan(0);

    expect(cardTitles[0].nativeElement.textContent).toContain("Angular security Course")

  });

  const loadCourses = (courses = setupCourses()) =>{
    coursesService.findAllCourses.and.returnValue(of(courses))
    fixture.detectChanges();
  }

});


